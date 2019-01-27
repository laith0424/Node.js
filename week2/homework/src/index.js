"use strict";

var fs = require('fs');

var program = require('commander');
 
 program
   .version('0.1.0')
   .option('-h, --help', 'HELP')
   .option('-a, --add [type]', 'Add an item')
   .option('-r, --remove [type]', 'remove an item')
   .option('-l, --list', 'show the list of the items')
   .option('-R, --reset', 'delete all the items')
   .option('-u, --update [type]', 'Update an  item with a new one')
   .parse(process.argv);
  
 
 
 if      (program.add)    { addItem( program.add ); console.log('  - Add an item : ' , program.add );  }
 else if (program.remove) { removeItem( program.remove ); console.log('  - remove an item : ' , program.remove);  }
 else if (program.list)   { readTheList();  console.log('  - show the list of the items');}
 else if (program.reset)  { resetTheList(); console.log('  - delete all the items'); }
 else if (program.update) { updateItem( program.update.split(',')[0] ,  program.update.split(',')[1] );  }
 else if (program.help)   {  helpFile(); }
 


 function addItem( item ){

  fs.readFile('to-dos.json', 'utf8', function (err, data) {
    if(err){
      console.log("err");
    }
    else{
      let myFile = JSON.parse(data);
      let index =  myFile.length;
      let newItem = `{ "${index.toString()}" : "${item}" }`;
      newItem = JSON.parse(newItem);
      myFile.push(newItem);

      fs.writeFile('to-dos.json', JSON.stringify( myFile ) , function(err, result) {
        if(err) console.log('error', err);
      } );

    }
   });

 }


 

 function removeItem( item ){

  fs.readFile('to-dos.json', 'utf8', function (err, data) {
    if(err){
      console.log("err");
    }
    else{
      let myFile = JSON.parse(data);
      if( myFile.length == 0 ){
        console.log( '  - There are no items in the file' );
      }
      else{
        console.log( `You removed this item : ${ myFile[ parseInt( item )-1 ] }` );
        myFile.splice(item - 1, 1);
      }
      

      fs.writeFile('to-dos.json', JSON.stringify( myFile ) , function(err, result) {
        if(err) console.log('error', err);
      } );

    }
   });

 }


 function readTheList(  ){

  fs.readFile('to-dos.json', 'utf8', function (err, data) {
    if(err){
      console.log("err");
    }
    else{
      let myFile = JSON.parse(data);
      console.log( myFile );

    }
   });

 }



 function resetTheList( item ){

  fs.writeFile('to-dos.json', JSON.stringify( [] ) , function(err, result) {
    if(err) console.log('error', err);
  } );
 }


 function helpFile(){

  fs.readFile('help.txt', 'utf8', function (err, data) {
    if(err){
      console.log("err");
    }
    else{
      console.log( data );
    }
   });

 }


 function updateItem( item1 , item2 ){

  fs.readFile('to-dos.json', 'utf8', function (err, data) {
    if(err){
      console.log("err");
    }
    else{
      let myFile = JSON.parse(data);
      let index =  myFile.length;
      let newItem = `{ "${index.toString()}" : "${item2}" }`;
      newItem = JSON.parse(newItem);
      if( myFile.length == 0 ){
        console.log( '  - There are no items in the file' );
      }
      else{
        console.log( `You update the item!` );
        myFile.splice(item1 - 1, 1 ,newItem);
        fs.writeFile('to-dos.json', JSON.stringify( myFile ) , function(err, result) {
          if(err) console.log('error', err);
        } );
      }
     

    }
   });

 }


