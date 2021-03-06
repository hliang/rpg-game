$(document).ready(function () {
    var mario = {
        name: "Mario", 
        avatar: "assets/images/mario.png", 
        maxHp: 120,
        hp: 120, 
        attackPower: 8, 
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
        maxHp: 100,
        hp: 100, 
        attackPower: 20, 
        counterPower: 5
    };
    var yoshi = {
        name: "Yoshi", 
        avatar: "assets/images/yoshi.png", 
        maxHp: 150,
        hp: 150, 
        attackPower: 15, 
        counterPower: 20
    };
    var bowser = {
        name: "Bowser", 
        avatar: "assets/images/bowser.png", 
        maxHp: 180,
        hp: 180, 
        attackPower: 60, 
        counterPower: 25
    };
    var princess = {
        name: "Princess", 
        avatar: "assets/images/princess.png", 
        maxHp: 120,
        hp: 120, 
        attackPower: 20, 
        counterPower: 10
    };

    var charList = [mario, toad, yoshi, bowser];
    var playerLeft = null;
    var playerRight = null;
    var enemyList = charList;

    // player1 vs player2
    var attack = function (offender, defender) {
        console.log("offender hp=" + offender.hp + " attack=" + offender.attackPower + " backfire=" + offender.counterPower);
        console.log("defender hp=" + defender.hp + " attack=" + defender.attackPower + " backfire=" + defender.counterPower);
        // attack
        defender.hp -= offender.attackPower;
        $("#gameinfo-msg").html($("<p>").text(offender.name + " hits for " + offender.attackPower + " damage ⇨"));
        offender.attackPower += 8;
        // counter attack
        if (defender.hp > 0) { // if defender is not dead yet
            offender.hp -= defender.counterPower;
            $("#gameinfo-msg").append($("<p>").text("⇦ " + defender.name + " hits for " + defender.counterPower + " damage"));
            console.log("counter-attack");
        }
        console.log("offender hp=" + offender.hp + " attack=" + offender.attackPower + " backfire=" + offender.counterPower);
        console.log("defender hp=" + defender.hp + " attack=" + defender.attackPower + " backfire=" + defender.counterPower);
    };

    var updateStat = function (player) {
        // var playerNameVar = player.name.toLowerCase();
        // var hp = "HP: " + player.hp + "/" + player.maxHp;
        // var attackPower = "Dmg: " + player.attackPower;
        var hp = $("<p>").append("HP: " + player.hp + "/" + player.maxHp);
        if (player.position == "left") {
            var atk = $("<p>").append("Dmg: " + player.attackPower);
            $("#player-left-stat").html(hp);
            $("#player-left-stat").append(atk);
            // if character is dead
            if (player.hp <= 0) {
                $("#player-left .player img").addClass("grayimg");
                $("#"+player.name).removeClass("card-player");
                $("#"+player.name).addClass("card-defeated");
                // playerLeft = null;
                // ask user to restart, everything should go back to initial state. maybe just refresh the page?
                $("#btn-fight").hide()
                $("#btn-restart").show();
                $("#gameinfo-msg").append($("<p>").text(player.name + " is defeated..."));
                $("#gameinfo-msg").append($("<p>").text("GAME OVER!!!"));
            }
        } else if (player.position == "right") {
            var atk = $("<p>").append("Dmg: " + player.counterPower);
            $("#player-right-stat").html(hp);
            $("#player-right-stat").append(atk);  
            // if character is dead 
            if (player.hp <= 0) {
                $("#player-right .player img").addClass("grayimg");
                $("#"+player.name).removeClass("card-enemy");
                $("#"+player.name).addClass("card-defeated");
                $("#gameinfo-msg").append($("<p>").text(player.name + " is defeated."));
                // remove character from array
                var index = charList.indexOf(playerRight);
                console.log("removing char i=" + index);
                if (index !== -1) charList.splice(index, 1);
                playerRight = null;
                console.log("lalala " + playerLeft.hp + " " + charList.length);
                // asked user to pick new enemy
                if (playerLeft.hp > 0 && charList.length > 1) {
                    $("#btn-fight").hide();
                    $("#btn-p2").show();
                } else if (playerLeft.hp > 0 && charList.length == 1) {
                    $("#btn-fight").hide();
                    $("#gameinfo-msg").append($("<p>").text("YOU WIN!"));
                    $("#gameinfo-msg").append($("<p>").text("GAME OVER!!!"));
                    $("#btn-restart").show();
                }
            } 
        }
        console.log(charList);
        
    }

    // display characters in list
    charList.forEach(function (character) {
        console.log("character added in list: " + this + " name=" + character.name)
        var charDiv = $('<div/>', { 'class': 'col col-xs-3 col-sm-2 col-md-2' }).append(
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
        if ($(this).find("img").hasClass("grayimg")) {
            console.log("character not available");
            return;
        }
        if (playerLeft == null) { // first player
            // character stat
            var playerStat = $('<div/>', { id: "player-left-stat" });
            // playerStat.append($('<div/>', { id: "player-left-hp-bar" })); // hp
            // console.log(playerStat.html());
            $("#player-left .player").html(playerStat);

            // $("#character-list .card img").removeClass("grayimg");
            $("#player-left .player").append($(this).find("img").clone());
            $(this).find("img").addClass("grayimg");
            $(".card").addClass("card-enemy");
            $(this).removeClass("card-enemy");
            $(this).addClass("card-player");

            // set playerLeft
            var varname = $(this).find(".card-header").text().toLowerCase();
            playerLeft = eval(varname);
            playerLeft.position = "left";
            updateStat(playerLeft);

            // prompt to pick enemy
            $("#btn-p1").hide();
            $("#btn-p2").show();
        } else if (playerRight == null && playerLeft.hp > 0) { // second player
            // character stat
            var playerStat = $('<div/>', { id: "player-right-stat" });
            // playerStat.append($('<div/>', { id: "player-right-hp-bar" })); // hp
            // console.log(playerStat.html());
            $("#player-right .player").html(playerStat);

            // $("#character-list .card img").removeClass("grayimg");
            $("#player-right .player").append($(this).find("img").clone());
            $(this).find("img").addClass("grayimg");
            
            // set playerRight
            var varname = $(this).find(".card-header").text().toLowerCase();
            playerRight = eval(varname);
            playerRight.position = "right";
            updateStat(playerRight);

            // ready to fight
            $("#btn-p2").hide();
            $("#btn-fight").show();

            // clear gameinfo-msg, if there is any
            $("#gameinfo-msg").empty();
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
            $("#player-left .player img").animate({top: '+=10px'}, 1000);
            $("#player-left .player img").animate({top: '-=10px'}, 1000);
            // $("#logo").animate({top: '+=1vh'}, 1000);
            attack(playerLeft, playerRight);
            updateStat(playerRight);
            updateStat(playerLeft);
        } else {
            console.log("one player already dead");
        }
    });

    // restart
    $("#btn-restart").on("click", function () {
        location.reload();
    });

});