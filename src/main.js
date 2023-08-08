
    let currentItemIndex = 0;

    const keys = [
      {note: "C", key: "major"},
      {note: "C", key: "minor"},
      // {note: "D♭", key: "major"},
      // {note: "C♯", key: "minor"},
      // {note: "D", key: "major"},
      // {note: "D", key: "minor"},
      {note: "E♭", key: "major"},
      {note: "E♭", key: "minor"},
      // {note: "E", key: "major"},
      // {note: "E", key: "minor"},
      // {note: "F", key: "major"},
      // {note: "F", key: "minor"},
      {note: "F♯", key: "major"},
      {note: "F♯", key: "minor"},
      // {note: "G", key: "major"},
      // {note: "G", key: "minor"},
      // {note: "A♭", key: "major"},
      // {note: "G♯", key: "minor"},
      {note: "A", key: "major"},
      {note: "A", key: "minor"},
      // {note: "B♭", key: "major"},
      // {note: "B♭", key: "minor"},
      // {note: "B", key: "major"},
      // {note: "B", key: "minor"}
      ]


    const arpeggios = [
      {note: "C", key: "major"},
      {note: "C", key: "minor"},
      // {note: "D♭", key: "major"},
      // {note: "C♯", key: "minor"},
      // {note: "D", key: "major"},
      // {note: "D", key: "minor"},
      {note: "E♭", key: "major"},
      {note: "E♭", key: "minor"},
      // {note: "E", key: "major"},
      // {note: "E", key: "minor"},
      // {note: "F", key: "major"},
      // {note: "F", key: "minor"},
      {note: "F♯", key: "major"},
      {note: "F♯", key: "minor"},
      // {note: "G", key: "major"},
      // {note: "G", key: "minor"},
      // {note: "A♭", key: "major"},
      // {note: "G♯", key: "minor"},
      {note: "A", key: "major"},
      {note: "A", key: "minor"},
      // {note: "B♭", key: "major", fingering: "LH - 3 2 1, RH - 4 2 1"},
      // {note: "B♭", key: "minor", fingering: "LH - 3 2 1, RH - 3 2 1"},
      // {note: "B", key: "major"},
      // {note: "B", key: "minor"}
      ]

    const major_keys = [
      {note: "C", key: "major"},
      // {note: "D♭", key: "major"},
      // {note: "D", key: "major"},
      {note: "E♭", key: "major"},
      // {note: "E", key: "major"},
      // {note: "F", key: "major"},
      {note: "F♯", key: "major"},
      // {note: "G", key: "major"},
      // {note: "A♭", key: "major"},
      {note: "A", key: "major"},
      // {note: "B♭", key: "major"},
      // {note: "B", key: "major"},
      ]

    const pieces = [
      {piece: "Haydn: Exposition"},
      {piece: "Haydn: Development"},
      {piece: "Haydn: Recaptiulation"},
      {piece: "Chopin Mazurka: A"},
      {piece: "Chopin Mazurka: B"},
      {piece: "Scarlatti: A1"},
      {piece: "Scarlatti: A2"},
      {piece: "Scarlatti: B1"},
      {piece: "Scarlatti: B2"},
      {piece: "Chopin Nocturne: Section 1"},
      {piece: "Chopin Nocturne: Section 2"},
      {piece: "Chopin Nocturne: Section 3"},
      {piece: "Chopin Nocturne: Section 4"},
      {piece: "Chopin Nocturne: Descending bits"},
      ]

    let saved_exercises = [];

    if(window.localStorage.getItem("storedExercises") == null){
      console.log("No saved exercises")
      saved_exercises = [];
    }
    else{
      saved_exercises = JSON.parse(window.localStorage.getItem("storedExercises"));
    }

    

    if(saved_exercises.length == 0){
      document.getElementById("load-saved-button").setAttribute("disabled", "");
    }

    // function removeAllExercises(){
    //   window.localStorage.removeItem("storedExercises")
    // }

    function removeExercise(){
      exercises.splice(currentItemIndex, 1);
      saved_exercises = exercises;
      window.localStorage.setItem("storedExercises", JSON.stringify(saved_exercises));
      if(currentItemIndex  >= exercises.length){
        currentItemIndex--;
      }
      if(exercises.length == 0){

        document.getElementById("load-saved-button").setAttribute("disabled", "");

        document.getElementById("note").innerText = "All done!" ;

        document.getElementById("key").innerText = "" ;

        document.getElementById("exercise").innerText = "" ;

        document.getElementById("articulation").innerText = "" ;

        document.getElementById("motion").innerText = "" ;

        document.getElementById("fingering").innerText = "" ;

        document.getElementById("counter").innerText = "" ;


      } else{
        displayExercise();
      }
    }

    function backCard(){
     document.getElementById("exercise-card").style.display = 'none';
     document.getElementById("button-card").style.display = '';
   }

   function loadExercises() {
    currentItemIndex = 0;
    generateExercises()
    displayExercise()

    document.getElementById("save-button").style.display = '';
    document.getElementById("remove-button").style.display = 'none';

    document.getElementById("exercise-card").style.display = '';
    document.getElementById("button-card").style.display = 'none';

  }


  function loadSavedExercises(){
    currentItemIndex = 0;
    exercises = saved_exercises;
    displayExercise();


    document.getElementById("save-button").style.display = 'none';
    document.getElementById("remove-button").style.display = '';

    document.getElementById("exercise-card").style.display = '';
    document.getElementById("button-card").style.display = 'none';
  }

  function backButton(){
    if(currentItemIndex > 0){
      currentItemIndex--;
      displayExercise();
    }

  }

  function forwardButton(){
    if(currentItemIndex < exercises.length - 1){
      currentItemIndex++;
      displayExercise();
    }

  }

  function saveExercise(){
    document.getElementById("save-button").setAttribute("disabled", "");
    saved_exercises.push(exercises[currentItemIndex]);
    window.localStorage.setItem("storedExercises", JSON.stringify(saved_exercises));
    document.getElementById("load-saved-button").removeAttribute("disabled", "");
  }

  function displayExercise(){


    // Check if we have this exercise already

    var already_saved = false;
    for (x of saved_exercises) {
      if  (exercises[currentItemIndex].note == x.note &&
        exercises[currentItemIndex].key == x.key &&
        exercises[currentItemIndex].exercise == x.exercise &&
        exercises[currentItemIndex].articulation == x.articulation &&
        exercises[currentItemIndex].motion == x.motion)
        { already_saved = true}

    }

    if(already_saved){
      document.getElementById("save-button").setAttribute("disabled", "");
    } else{
      document.getElementById("save-button").removeAttribute("disabled");
    }

    document.getElementById("note").innerText = exercises[currentItemIndex].note ;

    if(exercises[currentItemIndex].key != ""){
      document.getElementById("key").innerText = exercises[currentItemIndex].key ;
    }else{
      document.getElementById("key").innerText = "" ;
    }

    document.getElementById("exercise").innerText = exercises[currentItemIndex].exercise ;

    if(exercises[currentItemIndex].articulation != ""){
      document.getElementById("articulation").innerText = exercises[currentItemIndex].articulation ;
    }else{
      document.getElementById("articulation").innerText = "" ;
    }

    if(exercises[currentItemIndex].motion != ""){
      document.getElementById("motion").innerText = exercises[currentItemIndex].motion + " motion";
    }else{
      document.getElementById("motion").innerText = "" ;
    }

    if(exercises[currentItemIndex].fingering){
      document.getElementById("fingering").innerText = exercises[currentItemIndex].fingering;
    }else{
      document.getElementById("fingering").innerText = "" ;
    }

    document.getElementById("counter").innerText = currentItemIndex + 1 + " / " + exercises.length ;
  }

  function generateExercises(){


    var scales_n = 4;
    var arp_n = 4;
    var dom7_n = 2;


    // var scales_n = 7;
    // var arp_n = 1;
    // var dom7_n = 1;



        // Make scales
    scales = JSON.parse(JSON.stringify(_.sample(keys, scales_n)));

    for (x of scales) {

      x.exercise = "scale"
      x.articulation = "Legato"
      x.motion = "Similar"

      if(x.key == "minor"){
        x.order = 1;
        if(Math.random() < 0.5){
          x.key  = "harmonic minor"
        }
        else{
          x.key  = "melodic minor"
        }
      }
    }


      // Choose 3 scales to be staccato, choose another 3 to be contrary motion

    // rand_n = Array.from(Array(scales_n).keys());


    for( let i = 0; i < 2; i++ ){
      scales[(scales_n-1)-i].articulation = "Contrary"
      if(scales[(scales_n-1)-i].key == "melodic minor") { scales[(scales_n-1)-i].key = "harmonic minor";}

      // scales[(scales_n-4)-i].articulation = "Staccato"

    }


        // Make Arpeggios

    arpeggios_rand = JSON.parse(JSON.stringify(_.sample(arpeggios, arp_n)));


    for( x of arpeggios_rand){
      x.exercise = "arpeggio"
      x.articulation = "Legato"
      x.motion = ""
    }


      // Make dom 7 Arpeggios

    arpeggios_dom = JSON.parse(JSON.stringify(_.sample(major_keys, dom7_n)));

    for( x of arpeggios_dom){
      x.exercise = "Dom 7 arpeggio"
      x.articulation = "Legato"
      x.motion = ""
    }

      // Make Chromatic scale


    chrom = JSON.parse(JSON.stringify(_.sample(keys)));
    chrom.key = "";
    chrom.exercise = "chromatic scale"
    chrom.motion = ""


    if(Math.random() < 0.5){
      chrom.articulation  = "Legato"
    }
    else{
      chrom.articulation  = "Staccato"
    }


    // exercises = scales.concat(chrom).concat(_.shuffle(arpeggios_rand)).concat(_.shuffle(arpeggios_dom));
    exercises = scales.concat(_.shuffle(arpeggios_rand)).concat(_.shuffle(arpeggios_dom));

    console.log("The following scales have been generated:")
    console.log(exercises)




  }
