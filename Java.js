$(window).on("load", StartStory);
/* Hér har vi defineret alle variablerne, så de både "findes" i koden, og evt. har en startværdi. */
var niveau1_klik = 0;
var er_niveau1_faerdig = false;
var er_den_passende;
var er_den_upassende;
var the_score = 0;
var theTimer;
var svar_tid = 10000;
var pickle_score = 8; /* med en startværdi på 8, bliver Charlies startsprite den neutrale i forhold til spillets score (pickle_score). Score forholdende kan ses nede i "styr_mr_pickle" funktionen. */


function StartStory() {
    $("#payoff1").hide();
    $("#payoff2").hide();
    $("#brevkasse_knap").hide();
    $("#replay_knap").hide();
    $("#chat_knap").hide();
    $("#mrpickle_spritepayoff2").hide();
    //  console.log("Historien er startet");
    $("#mrpickle_sprite").addClass("mrpickle_happy4");
    startSpm();
}

function startSpm() {


    /* Start spørgsmål: Dette er starten af hver "runde" for hvert billede. Efter man har svaret Del eller Del ikke, ryger man herop igen.
    Derved som "starten af cyklusen" */

    console.log("START spørgsmål the_score", the_score);

    clearTimeout(theTimer);

    $("#passende_sprite").removeClass("out_left");
    $("#passende_sprite").removeClass("out_right");
    $("#upassende_sprite").removeClass("out_left");
    $("#upassende_sprite").removeClass("out_right");
    $("#billede_container").removeClass();
    $("#passende_sprite").addClass("billed_postn");
    $("#upassende_sprite").addClass("billed_postn");
    if (niveau1_klik == 35) { /* Dette stopper spillet og sende en til payoff, når der er klikket 40 gange.*/
        console.log("Spillet er Slut!");
        spil_slut_random();


    } else {
        niveau1();
        theTimer = setTimeout(tidenErGaaet, svar_tid);

    }

}



/*************** SPIL LEVELS HÉR ******************/

/* Dette er funktionen for spillets niveauer, og hvordan og hvornår spillet stiger i hastighed og intesitet. B.la. hér man skulle definere at musikken steg i hastighed.
    Det er muligt at kode en række "if" funktioner, men kun hvis man bygge det op som:
if (){}
 else if (){}
 if (){}

osv.

*EDIT: Kan åbenbart også gøres med "if if if if". ¯\_(ツ)_/¯
*/
function niveau1() {

    niveau1_klik++;
    console.log("niveau1_klik", niveau1_klik);
    /* if (Niveau_klik == x) bestemmer hvornår næste level skal ind. Hvis tallet er 5, kommer tilhørende nivuea ind efter 5 klik, osv.   */
    if (niveau1_klik == 5) {
        console.log("LEVEL 2");
        /* disse fades referer til html'en. Er potentielt overflødige */
        $("#fade-text_level2").removeClass("invisible");
        $("#fade-text_level2").addClass("fill");
        $("#fade-text_level2").addClass("stroke");
        /* nedenstående er den bestemt tid, man har til at svare på hvert spørgsmål */
        svar_tid = 8000;
        /* timeren skal cleares for hvert level, for at de ikke overlapper og derved koger en mægtig gryde af FuckUp-sovs. */
        clearTimeout();

    } else if (niveau1_klik == 9) {
        svar_tid = 6000;
        console.log("LEVEL 3");
        $("#fade-text_level3").removeClass("invisible");
        $("#fade-text_level3").addClass("fill");
        $("#fade-text_level3").addClass("stroke");
        clearTimeout();
    }
    if (niveau1_klik == 12) {
        svar_tid = 4000;
        console.log("LEVEL 4");
        $("#fade-text_level4").removeClass("invisible");
        $("#fade-text_level4").addClass("fill");
        $("#fade-text_level4").addClass("stroke");
        clearTimeout();

    } else if (niveau1_klik == 16) {
        svar_tid = 2000;
        console.log("LEVEL 5");
        $("#fade-text_level5").removeClass("invisible");
        $("#fade-text_level5").addClass("fill");
        $("#fade-text_level5").addClass("stroke");

        clearTimeout();

    }
    if (niveau1_klik == 20) {
        // timertiden skal sættes ned
        svar_tid = 300;
        console.log("LEVEL 6");
        clearTimeout();

    }
    /* efter alle if/else if afsnit, er der en sektion som nedenstående, der er enten sender en videre i koden eller tilføjer nødvendiger funktioner */
    clearTimeout(theTimer);
    console.log("svar_tid", svar_tid);
    randomValg1();
    /* Dette gør Del og Del ikke knapperne klikkelige */
    $("#knap_del").on("click", del_klik);
    $("#knap_del_ikke").on("click", del_ikke_klik);




}


function tidenErGaaet() {

    /* Dette er funktionen for at tiden er gået for et billede, med "if" og "else" der automatisk trykker "Del" for billedet. Selvom det er et
    passende billede der bliver delt, får man stadig -score (pickle_score--;). Dette gør blandt andet, at Charlie altid bliver ked af det :'( */
    console.log("tiden er gået");

    if (er_den_passende == true) {
        console.log("passende delt");
        $("#fail").removeClass();
        $("#fail")[0].play();
        pickle_score--; /* styrer Charlies humoer */
        $("#passende_sprite").removeClass();
        $("#passende_sprite").addClass("out_left");
        console.log("out_left");
        $("#passende_sprite").on("animationend", startPositon);

    } else {
        pickle_score--;
        $("#fail").removeClass();
        $("#fail")[0].play();
        $("#upassende_sprite").removeClass();
        $("#upassende_sprite").addClass("out_left");
        console.log("out_right");
        $("#upassende_sprite").on("animationend", startPositon);
    }
    styr_mr_pickle();

    /* Dette er funktionen for at man ryger op til startSpm igen  */
    setTimeout(startSpm, 500);
    knapperOff();


}

/* Dette er klik handlingerne, hvor billedernes animationer kommer i spil, og det bliver bestemt om der skal gives eller fjernes point. Selve opbygningen
af disse funktioner er næsten identiske til "tidenErGaaet". */

function del_klik() {

    if (er_den_passende == true)
    /* Refererer til en af de to variabler, der senere i sprite funktionerne bestemmer om tilhørende billede er passende
       eller upassende */
    {
        console.log("passende delt");
        $("#success").removeClass();
        $("#success")[0].play();
        pickle_score++;
        /* Billedets animationer */
        $("#passende_sprite").removeClass("billed_postn");
        $("#passende_sprite").addClass("out_left");
        console.log("out_left");
        $("#passende_sprite").on("animationend", startPositon);

    } else {
        pickle_score--;

        $("#fail").removeClass();
        $("#fail")[0].play();
        $("#upassende_sprite").removeClass("billed_postn");
        $("#upassende_sprite").addClass("out_left");
        console.log("out_right");
        $("#upassende_sprite").on("animationend", startPositon);
    }

    styr_mr_pickle();
    setTimeout(startSpm, 500);
    knapperOff();


}

/* siger sig selv :) */

function del_ikke_klik() {

    if (er_den_passende == true) {
        console.log("passende ikke delt");
        $("#success").removeClass();
        $("#success")[0].play();
        $("#passende_sprite").removeClass("billed_postn");
        $("#passende_sprite").addClass("out_right");
        console.log("out_right");
        $("#passende_sprite").on("animationend", startPositon);
    } else {
        pickle_score++;

        $("#success").removeClass();
        $("#success")[0].play();
        $("#upassende_sprite").removeClass("billed_postn");
        $("#upassende_sprite").addClass("out_right");
        console.log("out_left");
        $("#upassende_sprite").on("animationend", startPositon);
    }
    styr_mr_pickle();
    setTimeout(startSpm, 500);
    knapperOff();


}

/* startposition på hvert billede, så at de ryger ind efter at have været ude af scenen. Er potentielt overflødigt, da positions-animationerne
    også er sat ind øvrigere stedet, i klik-funktionerne f.eks. */

function startPositon() {
    console.log("startPositon");

    $("#passende_sprite").removeClass("out_left");
    $("#passende_sprite").removeClass("out_right");
    $("#upassende_sprite").removeClass("out_left");
    $("#upassende_sprite").removeClass("out_right");
    $("#billede_container").removeClass();
    $("#passende_sprite").addClass("billed_postn");
    $("#upassende_sprite").addClass("billed_postn");
}


/* Charlie, også bedre kendet som "mr.pickles", sprite-animations funktioner. Styret udelukkende af if-funktioner, en css-class bliver
tilføjet i forhold til niveauet af pickle_score, som bliver forhøjet eller formindsket af klik-funktionerne og tidenErGaaet fra før */

function styr_mr_pickle() {
    console.log("PICKLE ANIMATION");
    if (pickle_score == 14) {
        $("#mrpickle_sprite").removeClass();
        $("#mrpickle_sprite").addClass("mrpickle_happy1");


    }
    if (pickle_score == 12) {
        $("#mrpickle_sprite").removeClass();
        $("#mrpickle_sprite").addClass("mrpickle_happy2");


    }
    if (pickle_score == 10) {
        $("#mrpickle_sprite").removeClass();
        $("#mrpickle_sprite").addClass("mrpickle_happy3");

    }

    if (pickle_score == 8) {
        $("#mrpickle_sprite").removeClass();
        $("#mrpickle_sprite").addClass("mrpickle_happy4");

    }

    if (pickle_score == 6) {
        $("#mrpickle_sprite").removeClass();
        $("#mrpickle_sprite").addClass("mrpickle_happy5");

    }

    if (pickle_score == 4) {
        $("#mrpickle_sprite").removeClass();
        $("#mrpickle_sprite").addClass("mrpickle_happy6");

    }


    if (pickle_score == 1) {
        $("#mrpickle_sprite").removeClass();
        $("#mrpickle_sprite").addClass("mrpickle_happy7");

    }
}



/* random funktionen, der bestemmer om der kommer et passende eller upassende billede frem. Er lige nu 70% chance for upassende og 30% chance for passende. Dette
kan eventuelt balanceres til 60-40 eller 50-50. Igen en simpel if/else funktion, der sender ned til either "upassende();" eller "passende();" */

function randomValg1() {
    console.log("random valg");

    // Vi laver variablen her, fordi
    var random = Math.random();
    // var random = 1;
    if (random > 0.3) {
        upassende();
        er_den_passende = false;
    } else {
        passende();
        er_den_passende = true;
    }
}
/* -----------PASSENDE BILLEDER----------- */
/* En simpel hide/show funktion sikre, at det kun er den vedrørende billedekategori der bliver vist i dets tilfælde. */
function upassende() {
    console.log("Vis Upassende Billeder");
    $("#upassende_sprite").show();
    $("#passende_sprite").hide();

    var er_den_upassende = true;
    /* CRUCIAL SHIT. Variablen der får klik-funktionerne til at forstå, hvilket billede der er kommet frem, så der kan gives den
       rigtige "pickle_score". Defineret i toppen*/
    var mitRandomTalX = Math.floor(Math.random() * 2);
    /* Disse to variabler gør, at spritesheetet bliver randomiset hen langs Y-aksen (altså to billeders bredde)
       og X-aksen (i upassende billeders tilfælde, 9 billeders bredde). Derved 2x9 = 18.*/
    var mitRandomTalY = Math.floor(Math.random() * 9);
    console.log("mitRandomTalX", mitRandomTalX);
    console.log("mitRandomTalY", mitRandomTalY);
    $("#upassende_sprite").css("background-position", (-mitRandomTalX * 100) + "% " + (-mitRandomTalY * 100) + "%");
    /* Dette ganger randomX-Y variablerne med hundrede, så at de
       passer til spritesheetets størrelse. */

    //  niveau1_restart();
}
/* -----------UPASSENDE BILLEDER----------- */

/* basically samme som overstående, udover at mitRandomTalX-Y værdierne er mindre til at passe det mindre spritesheet. */

function passende() {
    console.log("Vis passende Billeder");
    $("#passende_sprite").show();
    $("#upassende_sprite").hide();

    var er_den_passende = true;
    var mitRandomTalX = Math.floor(Math.random() * 2);
    var mitRandomTalY = Math.floor(Math.random() * 4);
    console.log("mitRandomTalX", mitRandomTalX);
    console.log("mitRandomTalY", mitRandomTalY);
    $("#passende_sprite").css("background-position", (-mitRandomTalX * 100) + "% " + (-mitRandomTalY * 100) + "%");

    //  niveau1_restart();
}

//function niveau1_restart() {
//    console.log("neveau1_restart")
//    $("#knap_del").off("click", randomValg1);
//    $("#knap_del_ikke").off("click", randomValg1);
//    setTimeout(niveau1, 2000);
//    //niveau1();
//}

/* deaktiverer kort knapperne efter hvert tryk, så man ikke kan spamme sig gennem spillet. Kan evt. forhøje setTimeout værdi, for at låse knapperne i længere tid. */

function knapperOff() {
    $("#knap_del").off("click");
    $("#knap_del_ikke").off("click");
    setTimeout(500);

}

/* Randomiseren, der bestemmer hvilket slut-billede der skal vises. */

function spil_slut_random() {
    console.log("spil slut payoff");

    // Vi laver variablen her, fordi
    var random = Math.random();
    // var random = 1;
    if (random > 0.5) {
        payoff_1();

    } else {
        payoff_2();

    }
}

function payoff_1() {
    console.log("payoff 1");
    $("#payoff_container").addClass("payoff1");
    $("#payoff1").fadeIn(1500);
    $("#brevkasse_knap").fadeIn(1500);
    $("#chat_knap").fadeIn(1500);
    $("#replay_knap").fadeIn(1500);
    $("#replay_knap").on("click");
    $("#brevkasse_knap").on("click");
    $("#chat_knap").on("click");

}

function payoff_2() {
    console.log("payoff 2");
    $("#payoff_container").addClass("payoff2");
    $("#mrpickle_spritepayoff2").addClass("mrpickle_kf");
    $("#payoff2").fadeIn(1500);
    $("#brevkasse_knap").fadeIn(1500);
    $("#chat_knap").fadeIn(1500);
    $("#replay_knap").fadeIn(1500);
    $("#mrpickle_spritepayoff2").fadeIn(1500);
    // $("#payoff1").hide(1500);
    $("#replay_knap").on("click");
    $("#brevkasse_knap").on("click");
    $("#chat_knap").on("click");

}
