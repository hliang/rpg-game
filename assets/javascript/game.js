$(document).ready(function () {
    var mario = {
        name: "Mario", 
        avatar: "assets/images/mario.png", 
        maxHp: 120,
        hp: 120, 
        attackPower: 20, 
        counterPower: 10
    };
    var luigi = {
        name: "Luigi", 
        avatar: "assets/images/luigi.png", 
        maxHp: 120,
        hp: 120, 
        attackPower: 20, 
        counterPower: 10
    };
    var toad = {
        name: "Toad", 
        avatar: "assets/images/toad.png", 
        maxHp: 120,
        hp: 120, 
        attackPower: 20, 
        counterPower: 10
    };
    var yoshi = {
        name: "Yoshi", 
        avatar: "assets/images/yoshi.png", 
        maxHp: 120,
        hp: 120, 
        attackPower: 20, 
        counterPower: 10
    };
    var bowser = {
        name: "Bowser", 
        avatar: "assets/images/bowser.png", 
        maxHp: 120,
        hp: 120, 
        attackPower: 20, 
        counterPower: 10
    };
    var princess = {
        name: "Princess", 
        avatar: "assets/images/princess.png", 
        maxHp: 120,
        hp: 120, 
        attackPower: 20, 
        counterPower: 10
    };

    var charList = [mario, luigi, toad, yoshi, bowser, princess];
    var playerLeft = null;
    var playerRight = null;
    var enemyList = charList;

    // player1 vs player2
    var attack = function (offender, defender) {
        console.log("offender hp=" + offender.hp + " attack=" + offender.attackPower + " backfire=" + offender.counterPower);
        console.log("defender hp=" + defender.hp + " attack=" + defender.attackPower + " backfire=" + defender.counterPower);
        // attack
        defender.hp -= offender.attackPower;
        offender.attackPower += 2;
        // counter attack
        offender.hp -= defender.counterPower;
        console.log("counter-attack");
        console.log("offender hp=" + offender.hp + " attack=" + offender.attackPower + " backfire=" + offender.counterPower);
        console.log("defender hp=" + defender.hp + " attack=" + defender.attackPower + " backfire=" + defender.counterPower);
    };

    var updateStat = function (player) {
        // var playerNameVar = player.name.toLowerCase();
        // var hp = "HP: " + player.hp + "/" + player.maxHp;
        // var attackPower = "Dmg: " + player.attackPower;
        var hp = $("<p>").append("HP: " + player.hp + "/" + player.maxHp);
        var atk = $("<p>").append("Dmg: " + player.attackPower);
        if (player.position == "left") {
            $("#player-left-stat").html(hp);
            $("#player-left-stat").append(atk);
            // if character is dead
            if (player.hp <= 0) {
                $("#player-left .player img").addClass("grayimg");
                // playerLeft = null;
                // ask user to restart, everything should go back to initial state. maybe just refresh the page?
            }
        } else if (player.position == "right") {
            $("#player-right-stat").html(hp);
            $("#player-right-stat").append(atk);  
            // if character is dead 
            if (player.hp <= 0) {
                $("#player-right .player img").addClass("grayimg");
                playerRight = null;
                // asked user to pick new enemy
            } 
        }
        
    }

    // display characters in list
    charList.forEach(function (character) {
        console.log("character added in list: " + this + " name=" + character.name)
        var charDiv = $('<div/>', { 'class': 'col col-xs-6 col-sm-4 col-md-2' }).append(
            $('<div/>', { 'class': 'card', id: character.name }).append(
                $('<div/>', { 'class': 'card-header', text: character.name })
            ).append(
                $('<div/>', { 'class': 'card-body' }).append(
                    $('<img/>', { 'src': character.avatar, alt: "avatar-" + character.name })
                )
            ).append(
                $('<div/>', { 'class': 'card-footer', text: character.hp })
            )
        );

        $("#character-list").append(charDiv);

    });


    // place selected character on the playground
    $("#character-list .card").on("click", function () {
        if (playerLeft == null) { // first player
            // character stat
            var playerStat = $('<div/>', { id: "player-left-stat" });
            playerStat.append($('<div/>', { id: "player-left-hp-bar" })); // hp
            // console.log(playerStat.html());
            $("#player-left .player").html(playerStat);

            // $("#character-list .card img").removeClass("grayimg");
            $("#player-left .player").append($(this).find("img").clone());
            $(this).find("img").addClass("grayimg");

            // set playerLeft
            var varname = $(this).find(".card-header").text().toLowerCase();
            playerLeft = eval(varname);
            playerLeft.position = "left";

            // prompt to pick enemy
            $("#btn-p1").hide();
            $("#btn-p2").show();
        } else if (playerRight == null) { // second player
            // character stat
            var playerStat = $('<div/>', { id: "player-right-stat" });
            playerStat.append($('<div/>', { id: "player-right-hp-bar" })); // hp
            // console.log(playerStat.html());
            $("#player-right .player").html(playerStat);

            // $("#character-list .card img").removeClass("grayimg");
            $("#player-right .player").append($(this).find("img").clone());
            $(this).find("img").addClass("grayimg");
            
            // set playerRight
            var varname = $(this).find(".card-header").text().toLowerCase();
            playerRight = eval(varname);
            playerRight.position = "right";

            // ready to fight
            $("#btn-p2").hide();
            $("#btn-fight").show();
        }  
    });

    $("#btn-fight").on("click", function () {
        if (playerLeft.hp > 0 && playerRight.hp > 0) {
            console.log("fight");
            $("#punch-sound").get(0).play();
            var btn = $(this);
            // btn.addClass("disabled");
            // setTimeout(function(){ // wait for sound to finish
            //     btn.removeClass("disabled");
            // }, 300);
            attack(playerLeft, playerRight);
            updateStat(playerLeft);
            updateStat(playerRight);
        } else {
            console.log("one player already dead");
        }
    });


});