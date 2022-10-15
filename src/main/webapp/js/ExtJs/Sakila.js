/*
14426 - Satish
Name:Satish Singh
Domain- SlimFast
Team- Sparta
Sakila Project UI
*/

//Creating Model for  Movie grid Store
var movieModel = Ext.create('Ext.data.Model', {
    fields: [{
        name: 'title',
        type: 'string'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'releaseYear',
        type: 'date'
    }, {
        name: 'directorName',
        type: 'string'
      
    }, {
        name: 'rating',
        type: 'string'
    }, {
        name: 'specialFeatures',
        type: 'string'
    }]
}); //End of model


//Creaing a store
var movieStore = Ext.create('Ext.data.Store', {
    model: movieModel,
	pageSize:10, //setting data per page
    proxy: {
       type:'ajax',
	url:'http://localhost:8080/Summer_Internship/myjson.action',
	
        enablePaging: true ,
reader:{
	type:'json',        //assigning typeof response
	rootProperty:'list',  //Setting rootProperty of response 
	totalProperty:'total' //Setting totalNumber of row of database according to that grid will be divided for pagnation
}    
},
	autoLoad:{      //using autoload function to load data 
		 start:0,    //Setting the startfrom which data get seletced in database
		limit:10    //Setting the limit for data per page
		}
	}
	);// End of store
	



//Creating a Form
var Form = Ext.create('Ext.form.Panel', {
    title: 'Movies Advance Search',
    height: 240,
    width:'100%',
    defaults: {  //Default type of field is textField
        xtype: 'textfield',
        width:300
    },
    /*style: {
      //This  style is used to identify the panel which helps during UI creation
                borderColor: 'Tomato',
                borderStyle: 'solid',
                borderWidth: '3px'
            },*/
    layout: 'absolute',// Taking absolute layout for better positioning of fields
    // items of form
    items: [{
        x:'30%',
        y: 30,
        fieldLabel: 'Movie Name:',
          heigth:50,
        name: 'movieName',
        id:'movieField'
    }, {
        x:'50%',
        y: 30,
        fieldLabel: 'Director Name:',
        name: 'DirectorName',
         id:'directorField'
    }, {
        x:'30%',
        y: 80,
        xtype: 'datefield',
        fieldLabel: 'Release Year:',
        name: 'releaseYear',
         format: 'Y', //setting format for dateField 
        id:'releaseField'
    }, {
	     //creating a combo box in form for language input
        x: '50%',
        y: 80,
        xtype: 'combobox',
        fieldLabel: 'Language:',
        id:'languageField',
        store: Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            //Data in combobox
            data: [{
                'abbr': '1',
                'name': 'English'
            }, {
                'abbr': '2',
                'name': 'Italian'
            }, {
                'abbr': '3',
                'name': 'Japanese'
            }, {
                'abbr': '4',
                'name': 'Mandarin'
            }, {
                'abbr': '5',
                'name': 'French'
            }, {
                'abbr': '6',
                'name': 'German'
            }]
        }),
        displayField: 'name',
        valueField: 'abbr'
    } //End of combo box of form field
, {
        //Creating a bottom panel in form for search and Reset button
        y: 150,
        width:'100%',
        height: 45,
        xtype: "panel",
        bodyStyle: {
            backgroundColor: '#f2f2f2'
        },
        /* style: {
  //This  style is used to identify the panel which helps during UI creation
            borderColor: 'Tomato',
            borderStyle: 'solid',
            borderWidth: '3px'
        },*/
        layout: 'absolute',
        items: [{
            x: '42%',
            y: 8,
            height: 30,
            width: 80,
            xtype: 'button',
            text: 'Search',
             handler:function(){
		    movieStore.removeAll();  //Clear the store before search
            //Ajax call for search data
            Ext.Ajax.request({
            url :'http://localhost:8080/Summer_Internship/search1.action' ,
            method:'GET',
reader:{
	type:'json',        //assigning typeof response
	rootProperty:'list',  //Setting rootProperty of response 
  	 
//Setting totalNumber of row of database according to that grid will be divided for pagnation
}  ,
            params: {
	         start:"8",
              title:Ext.getCmp('movieField').getValue(),
              directorName:Ext.getCmp('directorField').getValue(),
              releaseYear:Ext.getCmp('releaseField').getValue(),
              language_id:Ext.getCmp('languageField').getValue(),
               },    success: function (result, request){
	
           var data = Ext.decode(result.responseText, true);

            if(data.length!=0){// if response length is not equal to zero  then this block will execute
	
	 movieStore.loadData(data);
}
          else{// if response length is not equal to zero  then this block will execute
	  Ext.Msg.alert("Sorry","No data is found.");
}
           },
        failure: function (result, request){
          Ext.Msg.alert('Error in server' + result.responseText);
        }
});
}//End of search of handler function
        }//End of search of button
, { //Reset button
            x:'48%',
            y: 8,
            height: 30,
            width: 80,
            xtype: 'button',
            text: 'Reset',
           id:'reset',
            handler:function(){
	         //Reseting all form field
                Ext.getCmp('movieField').setValue('');
               Ext.getCmp('releaseField').setValue('');
                Ext.getCmp('directorField').setValue('');
                Ext.getCmp('languageField').setValue('');
//Removing search store data
movieStore.removeAll();
movieStore.load(); //Reloading the fetch data in store
            }//End of  reset button handler function
        }//End of reset button 
]//End of bottom panel of form
    }] //End of form items
});//End of Form

//Creating a grid to view store data
var movieDisplay = Ext.create('Ext.grid.Panel', {
    store: movieStore,
    width:'100%',
    height:450,
    title: 'Movie Grid',
   id:'grid',
  /*  style: {
        //This  style is used to identify the panel which helps during UI creation
        borderColor: 'Tomato',
        borderStyle: 'solid',
        borderWidth: '3px'
    },*/
     //
    selModel: {  // using selModel for checkboxes
        width:50,
        checkOnly: false,
        injectCheckbox: 'first',
        mode: 'SIMPLE',
        id:'Check'
    },
    selType: 'checkboxmodel',
     
    //Columns in grid
    columns: [{
        text: 'Title',
        dataIndex: 'title',
       width:'10%'
    }, {
        text: 'Description',
        dataIndex: 'description',
        width: '35%'
    }, {
        text: 'Release Year',
        dataIndex: 'releaseYear',
        width:'6%'
    }, {
        text: 'Language',
        dataIndex: 'language',
       width: '8%'
    }, {
        text: 'Director',
        dataIndex: 'directorName',
        width:'11%'
    }, {
        text: 'Rating',
        dataIndex: 'rating',
        //width: 60
    }, {
        text: 'Special Features',
        dataIndex: 'specialFeatures',
       width: '23%'
    }]
,
 dockedItems: [{
	 xtype: 'pagingtoolbar',
                store: movieStore, // same store GridPanel is using
                displayInfo: true,
            width:'50%',
 items: ['->' //This is used for give some space 
,
             {//Add button 
        xtype: 'button',
         text:"Add",
          iconCls:'fa fa-plus-circle',
         width:70,
          // function for add button
        handler:function(){
            // Creating a window popup
        var popup = Ext.create('Ext.window.Window', {
    title: 'Add Film',
    height:500,
    width: 450,
   layout:'absolute',// Taking absolute layout
    items:[{
        xtype:'label',
        text:'Title:',
        x:10,
        y:15
    },{
        xtype:'textfield',
        x:120,
        y:10,
        width:300,
        id:'addTitle'
    },
    {
        xtype:'label',
        text:'Release Year:',
        x:10,
        y:68
    },{
        xtype:'numberfield',
        x:120,
        y:60,
        width:300,
        value:'2000',
         id:'addReleaseYear'
    },
    {
        xtype:'label',
        text:'Special features:',
        x:10,
        y:115
    },{
        xtype:'combobox',
        x:120,
        y:110,
        width:300,
        id:'addSpecialFeatures',
        multiSelect: true,
        store: Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
           data: [{
                'abbr': 'Trailers',
                'name': 'Trailers'
            }, {
                'abbr': 'Commentaries',
                'name': 'Commentaries'                  
            }, {
                'abbr': 'Deleted Scenes',
                'name': 'Deleted Scenes'
            }, {
                'abbr': 'Behind the Scenes',
                'name': 'Behind the Scenes'
            }]
          
        }),
        displayField: 'name',
        valueField: 'abbr' 
    },
     {
        xtype:'label',
        text:'Rating:',
        x:10,
        y:160
    },{
        xtype:'combobox',
        x:120,
        y:155,
        width:300,
        id:'addRating',
         store: Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
           data: [{
                'abbr': 'G',
                'name': 'G'
            }, {
                'abbr': 'PG',
                'name': 'PG'                  
            }, {
                'abbr': 'PG-13',
                'name': 'PG-13'
            }, {
                'abbr': 'R',
                'name': 'R'
            },{
                'abbr': 'NC-17',
                'name': 'NC-17'
            }]
          
        }),
        displayField: 'name',
        valueField: 'abbr'
    },
     {
        xtype:'label',
        text:'Language:',
        x:10,
        y:205
    },{
        xtype:'combobox',
        x:120,
        y:200,
        width:300,
         id:'addLanguage',
         store: Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [{
                'abbr': '1',
                'name': 'English'
            }, {
                'abbr': '2',
                'name': 'Italian'
            }, {
                'abbr': '3',
                'name': 'Japanese'
            }, {
                'abbr': '4',
                'name': 'Mandarin'
            }, {
                'abbr': '5',
                'name': 'French'
            }, {
                'abbr': '6',
                'name': 'German'
            }]
        }),
        displayField: 'name',
        valueField: 'abbr'
    },
     {
        xtype:'label',
        text:'Director Name:',
        x:10,
        y:250
    },{
        xtype:'textfield',
        x:120,
        y:245,
        width:300,
         id:'addDirector'
    },
    {
        xtype:'label',
        text:'Description:',
        x:10,
        y:305
    },{
        xtype:'textarea',
        x:120,
        y:295,
        width:300,
         id:'addDescription'
    },{
        //Creating a bottom panel in add button window pop up for add and cancel button
        xtype:'panel',
        y:400,
        height:55,
         bodyStyle: {
            backgroundColor: '#f2f2f2'
        },
      /*  style: {
  //This  style is used to identify the panel which helps during UI creation
            borderColor: 'Tomato',
            borderStyle: 'solid',
            borderWidth: '3px'
        },*/
        layout: 'absolute',
        items: [{
            x: 150,
            y: 12,
            height: 30,
            width: 80,
            xtype: 'button',
            text: 'Save',
           handler:function(){
	     //Ajax call for save data 
 Ext.Ajax.request({
            url :'http://localhost:8080/Summer_Internship/addDa.action' ,
            method:'GET',
         params: {
              title:Ext.getCmp('addTitle').getValue(),
               description:Ext.getCmp('addDescription').getValue(),
      releaseYear:Ext.getCmp('addReleaseYear').getValue(),
        language_id:Ext.getCmp('addLanguage').getValue(),
       rating:Ext.getCmp('addRating').getValue(),
         specialFeatures:Ext.getCmp('addSpecialFeatures').getValue().join(),
         director:Ext.getCmp('addDirector').getValue()
        },
 success: function (result, request){
           Ext.Msg.alert('Success',result.responseText);
        },
        failure: function (result, request){
          Ext.Msg.alert('Error' + result.responseText);
        }
});
movieDisplay.getSelectionModel().deselectAll(); //Deselecting selected row after adding data 
popup.destroy();//Closing the popup after adding data 
movieStore.load();//Reloading sotre 
}
        }, {
            x: 250,
            y: 12,
            height: 30,
            width: 80,
            xtype: 'button',
            text: 'Cancel',
            handler:function(){
          popup.destroy();// Closing the popup when user clicks on cancel button
        }}]

    }
        ]
});
popup.show(); // showing the popup
        }//End of add button handler function
                }," ",'-'," ",{
	 xtype: 'button',
         text:"Edit",
          iconCls:'fa fa-edit',
            width:70,
    handler:function(){
         // Creating edit button pop up window
            var popup = Ext.create('Ext.window.Window', {
    title: 'Add Film',
    height:500,
    width: 450,
   layout:'absolute',
    items:[{
        xtype:'label',
        text:'Title:',
        x:10,
        y:15
    },{
        xtype:'textfield',
        id:'titleEdit',
        x:120,
        y:10,
        width:300
    },
    {
        xtype:'label',
        text:'Release Year:',
        x:10,
        y:68
    },{
        xtype:'numberfield',
         id:'releaseEdit',
        x:120,
        y:60,
        width:300
    },
    {
        xtype:'label',
        text:'Special features:',
        x:10,
        y:115
    },{
        xtype:'combobox',
        id:'featuresEdit',
        x:120,
        y:110,
        width:300,
         multiSelect: true,
       store: Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
           data: [{
                'abbr': 'Trailers',
                'name': 'Trailers'
            }, {
                'abbr': 'Commentaries',
                'name': 'Commentaries'                  
            }, {
                'abbr': 'Deleted Scenes',
                'name': 'Deleted Scenes'
            }, {
                'abbr': 'Behind the Scenes',
                'name': 'Behind the Scenes'
            }]
          
        }),
        displayField: 'name',
        valueField: 'abbr'
    },
     {
        xtype:'label',
        text:'Rating:',
        x:10,
        y:160
    },{
        xtype:'combobox',
        id:'ratingEdit',
        x:120,
        y:155,
        width:300,
       store: Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
           data: [{
                'abbr': 'G',
                'name': 'G'
            }, {
                'abbr': 'PG',
                'name': 'PG'                  
            }, {
                'abbr': 'PG-13',
                'name': 'PG-13'
            }, {
                'abbr': 'R',
                'name': 'R'
            },{
                'abbr': 'NC-17',
                'name': 'NC-17'
            }]
          
        }),
        displayField: 'name',
        valueField: 'abbr'
    },
     {
        xtype:'label',
        text:'Language:',
        x:10,
        y:205
    },{
        xtype:'combobox',
        id:'languageEdit',
        x:120,
        y:200,
        width:300,
      store: Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
           data: [{
                'abbr': '1',
                'name': 'English'
            }, {
                'abbr': '2',
                'name': 'Italian'
            }, {
                'abbr': '3',
                'name': 'Japanese'
            }, {
                'abbr': '4',
                'name': 'Mandarin'
            }, {
                'abbr': '5',
                'name': 'French'
            }, {
                'abbr': '6',
                'name': 'German'
            }]
          
        }),
        displayField: 'name',
        valueField: 'abbr'
    },
     {
        xtype:'label',
        text:'Director Name:',
        x:10,
        y:250
    },{
        xtype:'textfield',
        id:'directorEdit',
        x:120,
        y:245,
        width:300
    },
    {
        xtype:'label',
        text:'Description:',
        x:10,
        y:305
    },{
        xtype:'textarea',
        id:'descriptionEdit',
        x:120,
        y:295,
        width:300
    },{
        xtype:'panel',
        y:400,
        height:55,
         bodyStyle: {
            backgroundColor: '#f2f2f2'
        },
      /*  style: {
  //This  style is used to identify the panel which helps during UI creation
            borderColor: 'Tomato',
            borderStyle: 'solid',
            borderWidth: '3px'
        },*/
        layout: 'absolute',
        items: [{
            x: 150,
            y: 12,
            height: 30,
            width: 80,
            xtype: 'button',
            text: 'Save',
           handler:function(){
   // getting the selected checkbox row data from grid
         var selectedRow2 = movieDisplay.getSelectionModel().getSelection();
   // getting the selected checkbox row data from grid
    var rowData1=selectedRow2[0].data;
    //Set data in edit pop up fields from grid
        //Ajax call for save updated data
var language=Ext.getCmp('languageEdit').getValue();
 var language_id;
if(language.length>1){
	language_id=((language=="English")?1:(language=="Italian")?2:(language=="Japanese")?3:(language=="Mandarin")?4:(language=="French")?5:6);
}
else{
	language_id=language;
}
//alert(language_id);
	     Ext.Ajax.request({
            url :'http://localhost:8080/Summer_Internship/edit.action' ,
            method:'GET',
         params: {
	          titlebeforeedit:rowData1.title,
              title:Ext.getCmp('titleEdit').getValue(),
               description:Ext.getCmp('descriptionEdit').getValue(),
      releaseYear:Ext.getCmp('releaseEdit').getValue(),
        language_id:language_id,
       rating:Ext.getCmp('ratingEdit').getValue(),
         specialFeatures:  Ext.getCmp('featuresEdit').getValue().join(),
         directorName:Ext.getCmp('directorEdit').getValue()
        },
 success: function (result, request){
        Ext.Msg.alert("Success",result.responseText);
        },
        failure: function (result, request){
         Ext.Msg.alert("Error",result.responseText);
        }
});
movieDisplay.getSelectionModel().deselectAll(); //Deselecting selected row after the updating 
popup.destroy();  //Closing the popup after updating
movieStore.load(); //Reloading store after updating
}
        }, {
            x: 250,
            y: 12,
            height: 30,
            width: 80,
            xtype: 'button',
            text: 'Cancel',
            handler:function(){
          popup.destroy(); // Closing the pop up
        }}]

    }
        ]
});
popup.show();  // showing the pop up
    // getting the selected checkbox row from grid
    var selectedRow = movieDisplay.getSelectionModel().getSelection();
     
   // getting the selected checkbox row data from grid
    var rowData=selectedRow[0].data;

    //Set data in edit pop up fields from grid
Ext.getCmp('titleEdit').setValue(rowData.title);
Ext.getCmp('releaseEdit').setValue(rowData.releaseYear);
Ext.getCmp('featuresEdit').setValue(rowData.specialFeatures);
Ext.getCmp('ratingEdit').setValue(rowData.rating);
Ext.getCmp('languageEdit').setValue(rowData.language);
Ext.getCmp('directorEdit').setValue(rowData.directorName);
Ext.getCmp('descriptionEdit').setValue(rowData.description);

        }//End of edit button handler function
}," ",'-'," ",{
	 xtype: 'button',
         text:"Delete",
            width:70,
    handler:function(){
	//Getting the selected row 
	 var selectedRow = movieDisplay.getSelectionModel().getSelection();
	// var rowData=selectedRow[0].data;
alert(selectedRow.length);
var name="";
for(var i=0;i<selectedRow.length;i++){
	var rowData=selectedRow[i].data;
        name=rowData.title+","+name;
	//alert(arr[i].title);
}



  //Ajax call for delete operation
 Ext.Ajax.request({
            url :'http://localhost:8080/Summer_Internship/delete.action' ,
            method:'GET',
         params: {
	          title:name
},
success: function (result, request){
           Ext.Msg.alert("Success",result.responseText);
        },
        failure: function (result, request){
          Ext.Msg.alert('Error' + result.responseText);
        }
});
 movieDisplay.getSelectionModel().deselectAll(); //deseleting the row after deletion
//movieStore.load();  //Reloading  store data
}
},{
            xtype: 'filefield',
            id: 'form-file',
            emptyText: 'Select an image',
            fieldLabel: 'Photo',
            name: 'photo-path',
            buttonText: '',
            buttonConfig: {
                iconCls: 'upload-icon'
            }

        
}

            ]// End of items of docked  
	}
	
	]//End of docked 

});// End of grid

	



//Creating a onready function which execute only when all the components are ready
Ext.onReady(function() {
// This is the paren panel
Ext.create('Ext.panel.Panel', {
    width:'100%',
    height:790,
  /*style: {
  //This  style is used to identify the panel which helps during UI creation
            borderColor: 'Tomato',
            borderStyle: 'solid',
            borderWidth: '3px'
        },*/
    renderTo: Ext.getBody(),
      // here i have added form and grid 
    items: [Form, movieDisplay]
}); //End of parent panel
});// End of onReady function


//----------Thank You---------------