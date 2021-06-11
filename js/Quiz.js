class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("Yellow");
    
    //write code to show a heading for showing the result of Quiz
    fill("Blue");
    textSize(30);
    text("Result Of Quiz",350,50);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      fill("Blue");
      textSize(20);
      
    //write code to add a note here
      text("*Note: Contestant who answered correctly are hightlighted in green color!");
    }

    //write code to highlight contest who answered correctly
    for(var plr in allContestants){

       var correctAnswer = "2";

       if(correctAnswer === allContestants[plr].answer){
        fill("Green");
        text(allContestants[plr].name + " is correct",150,280);
      }
      else{
        fill("Red");
        text(allContestants[plr].name + " is wrong" ,150,330);
      }
    }
    
    
    
  }

}
