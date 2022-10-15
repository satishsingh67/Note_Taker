
//Add Form
var addTextAreaField = {
	xtype : 'textareafield',
	grow : true,
	id : 'addText',
	width : '100%',
	height : '100%',
	overflowY : 'scroll',
	layout : {
		type : 'absolute'
	},

}

var addButton = Ext.create('Ext.Button', {
	html : '<b>Add</b>',
	iconCls : 'fa fa-plus',
	layout : {
		type : 'absolute'
	},
	width : 110,
	height : 40,
	x : 630,
	y : 30,
	handler : function() {
		//Calling Loader 
		Ext.get('myModal').show();
		Ext.select('.loader1').show();
		Ext.Ajax.request({
			url : 'add.action',
			method : 'GET',
			reader : {
				type : 'json', // assigning typeof response
			},
			params : {
				notes : Ext.getCmp('addText').getValue(),
				id:Ext.get("userName").getValue().split(",")[0]
			},
			success : function(result, request) {
				//Hiding Loader 
				Ext.get('myModal').hide();
				Ext.select('.loader1').hide();
				var data = Ext.decode(result.responseText, true);

				if (data.status == "success") {// if response length is not
												// equal to zero
					Ext.Msg.alert("Success", data.message);
					Ext.getCmp('cardId').removeAll(true);
					fetchData("fetch");
				} else {
					Ext.Msg.alert("Failed", data.message);
				}

			},
			failure : function(result, request) {
				//Hiding Loader 
				Ext.get('myModal').hide();
				Ext.select('.loader1').hide();
				Ext.Msg.alert("Failed", data.message);
			}
		});

	}
});

var addReset = Ext.create('Ext.Button', {
	html : '<b>Reset</b>',
	layout : {
		type : 'absolute'
	},
	width : 100,
	height : 40,
	x : 670,
	y : 30,
	handler : function() {
		Ext.getCmp('addText').setValue('');
		
	}
});

var addForm = Ext.create('Ext.panel.Panel', {
	bodyStyle : {
		"background-color" : "DarkTurquoise"
	},
	width : "50%",
	height : 350,
	x : 400,
	y : 20,
	border : false,
	/*
	 * style:{ borderColor: 'black', borderStyle: 'solid' },
	 */
	items : [ addTextAreaField ]

});

var addPanel = Ext.create('Ext.panel.Panel', {
	title : 'Add',
	bodyStyle : {
		"background-color" : "DarkTurquoise"
	},
	width : 200,
	border : false,
	/*
	 * style:{ borderColor: 'blue', borderStyle: 'solid' },
	 */
	items : [ addForm, addButton, addReset ]
});

var search = Ext.create('Ext.panel.Panel', {
	bodyStyle : {
		"background-color" : "DarkTurquoise"
	},
	width : '50%',
	height : 95,
	x : 400,
	y : 15,
	border : false,
	/*
	 * style:{ borderColor: 'DarkTurquoise', borderStyle: 'solid' },
	 */
	items : [
			{
				xtype : 'datefield',
				emptyText : 'From',
				id : 'fromDate'

			},
			{
				xtype : 'datefield',
				emptyText : 'To',
				id : 'toDate'

			},
			{
				xtype : 'button',
				iconCls : 'x-fa fa-search',
				x : 175,
				y : -60,
				handler : function() {

					var fromDate = Ext.getCmp('fromDate').getValue();
					var toDate = Ext.getCmp('toDate').getValue();

					if (fromDate == null && toDate == null) {
						Ext.Msg.alert("Warning", "Please Select a Date");
					} else if (fromDate == null && toDate != null
							&& toDate.trim().length == 0) {
						Ext.Msg.alert("Warning", "Please Select a Start Date");
					} else if (fromDate == null && toDate != null
							&& toDate.trim().length > 0) {
						Ext.Msg.alert("Warning", "Please Select a Start Date");
					} else {
						//Calling Loader 
						Ext.get('myModal').show();
						Ext.select('.loader1').show();
						Ext.getCmp('cardId').removeAll(true);
						fetchData("search", fromDate, toDate);
						 Ext.getCmp('fromDate').setValue();
					     Ext.getCmp('toDate').setValue();
					}
					

				}

			}, {
				xtype : 'button',
				iconCls : 'x-fa fa-undo',
				text : 'Reset',
				x : 195,
				y : -60,
				handler : function() {
					//Calling Loader 
					Ext.get('myModal').show();
					Ext.select('.loader1').show();
					Ext.getCmp('cardId').removeAll(true);
					fetchData("fetch", null, null);
				}
			}, {
				xtype : 'label',
				forId : 'myFieldId',
				id : 'total',
				style : {
					'font-size' : '20px'
				},
				x : 500,
				y : -60
			} ]
});

var card = Ext.create('Ext.panel.Panel', {
	// title: 'View',
	bodyStyle : {
		"background-color" : "DarkTurquoise"
	},
	width : '50%',
	height : 535,
	id : "cardId",
	border : false,
	x : 400,
	y : 15,
/*
 * style:{ borderColor: 'blue', borderStyle: 'solid' }
 */
});

var createDynamicCard = function(data) {
	var textAreaField = {
		xtype : 'textareafield',
		grow : true,
		id : "textArea:" + data.id,
		value : data.notes,
		width : '100%',
		height : 125,
		y : 30,
		overflowY : 'scroll',
		readOnly : true,
		anchor : '100%'
	}

	var editButton = Ext.create('Ext.Button', {
		text : 'Edit',
		id : "edit:" + data.id,
		iconCls : 'x-fa fa-edit',
		layout : {
			type : 'absolute'
		},
		width : 90,
		x : 250,
		y : 162,
		handler : function(thisButton, eventObject) {
			var ID = thisButton.getId();

			var arr = ID.split(":");

			var myForm = new Ext.form.Panel({
				width : 430,
				height : 270,
				title : 'Edit Notes',
				floating : true,
				closable : true,
				modal : true,
				items : [
						{
							xtype : 'textareafield',
							id : 'formTextArea',
							width : '100%',
							height : '70%',
							name : 'message',
							overflowY : 'scroll',
							anchor : '100%',
							border : 2,
							style : {
								// This style is used to identify the panel
								// which helps during UI creation
								borderColor : 'Cyan',
								borderStyle : 'solid',
							},
						},
						{
							xtype : 'button',
							text : 'Save',
							layout : {
								type : 'absolute'
							},
							width : 80,
							x : 70,
							y : 15,
							handler : function() {
								myForm.hide();
								//Calling Loader 
								Ext.get('myModal').show();
								Ext.select('.loader1').show();
								Ext.Ajax.request({
									url : 'edit.action',
									method : 'GET',
									reader : {
										type : 'json', // assigning typeof
														// response
									},
									params : {
										id : arr[1],
										notes : Ext.getCmp('formTextArea')
												.getValue()
									},
									success : function(result, request) {

										var data = Ext.decode(
												result.responseText, true);

										if (data.status == "success") {// if
																		// response
																		// length
																		// is
																		// not
																		// equal
																		// to
																		// zero
											myForm.show();
											Ext.Msg.alert("Success",
													data.message);
											Ext.getCmp('cardId')
													.removeAll(true);
											fetchData("fetch");
											
										} else {
											//Hiding Loader 
											Ext.get('myModal').hide();
											Ext.select('.loader1').hide();
											myForm.show();
											Ext.Msg.alert("Failed",
													data.message);
											
										}

									},
									failure : function(result, request) {
										//Hiding Loader 
										Ext.get('myModal').hide();
										Ext.select('.loader1').hide();
										myForm.show();
										Ext.Msg.alert("Failed", data.message);
									}
								});
							}

						}, {
							xtype : 'button',
							text : 'Reset',
							layout : {
								type : 'absolute'
							},
							width : 80,
							x : 90,
							y : 15,
							handler : function() {
								Ext.getCmp('formTextArea').setValue('');

							}

						}, {
							xtype : 'button',
							text : 'Cancel',
							layout : {
								type : 'absolute'
							},
							width : 80,
							x : 110,
							y : 15,
							handler : function() {
								myForm.destroy();
							}

						} ]
			});
			Ext.getCmp('formTextArea').setValue(
					Ext.getCmp("textArea:" + arr[1]).getValue());

			myForm.show();
		}
	});

	var deleteButton = Ext.create('Ext.Button', {
		text : 'Delete',
		id : 'delete:' + data.id,
		iconCls : 'fa fa-minus',
		layout : {
			type : 'absolute'
		},
		width : 90,
		x : 370,
		y : 162,
		handler : function(thisButton, eventObject) {
			//Calling Loader 
			Ext.get('myModal').show();
			Ext.select('.loader1').show();
			var ID = thisButton.getId();

			var arr = ID.split(":");
			Ext.Ajax.request({
				url : 'delete.action',
				method : 'GET',
				reader : {
					type : 'json', // assigning typeof response
				},
				params : {
					id : arr[1]
				},
				success : function(result, request) {

					var data = Ext.decode(result.responseText, true);

					if (data.status == "success") {// if response length is not
													// equal to zero
						Ext.Msg.alert("Success", data.message);
						Ext.getCmp('cardId').removeAll(true);
						fetchData("fetch");
					} else {
						//Hiding Loader 
						Ext.get('myModal').hide();
						Ext.select('.loader1').hide();
						Ext.Msg.alert("Failed", data.message);
					}

				},
				failure : function(result, request) {
					//Hiding Loader 
					Ext.get('myModal').hide();
					Ext.select('.loader1').hide();
					Ext.Msg.alert("Failed", data.message);
				}
			});

		}
	});

	var createDateLabel = {
		xtype : 'label',
		html : '<b>Create Date: '
				+ Ext.Date.format(new Date(data.createDate), "Y-m-d H:i:s")
				+ '</b>',
		y : 5,
		style : {
			'font-size' : '17px'
		}
	}
	var updateDateLabel = {
		xtype : 'label',
		html : '<b>Update Date: '
				+ Ext.Date.format(new Date(data.updateDate), "Y-m-d H:i:s")
				+ '</b>',
		x : 452,
		y : 5,
		style : {
			'font-size' : '17px'
		}
	}

	card.add({
		id : 'card3' + data.id,
		height : 200,
		bodyStyle : {
			"background-color" : "LightBlue"
		},
		width : '100%',
		layout : {
			type : 'absolute'

		},
		margin : '10 0 10 0',
		items : [ createDateLabel, updateDateLabel, textAreaField, editButton,
				deleteButton ]
	});
}// Method End
// Loader

var fetchData = function(query, fromDate, toDate) {
	// Ajax call for fetch data
	Ext.Ajax.request({
		url : 'fetch.action',
		method : 'GET',
		reader : {
			type : 'json', // assigning typeof response
		},
		params : {
			query : query,
			fromDate : fromDate,
			toDate : toDate,
			id:Ext.get("userName").getValue().split(",")[0]
		},
		success : function(result, request) {
			//Hiding Loader 
			Ext.get('myModal').hide();
			Ext.select('.loader1').hide();
			var data = Ext.decode(result.responseText, true);

			if (data.status == "success") {// if response length is not equal
											// to zero
				Ext.getCmp("total").setHtml(
						'<b>Records:' + data.result.count + '</b>');
				if (data.result.count == 0) {

					Ext.Msg.alert("Sorry", "No data is found.");

				} else if (data.result.count > 2) {
					Ext.getCmp("cardId").setScrollable("y");
				} else {
					Ext.getCmp("cardId").setScrollable(false);
				}

				var Data = data.result.data;
				for (var i = 0; i < Data.length; i++) {
					createDynamicCard(Data[i]);
				}
			} else if (data.status == "failed") {// if response length is not
													// equal to zero then this
													// block
				// will execute
				Ext.Msg
						.alert("Failed",
								"Something went wrong.Please Try again");
			} else {
				Ext.Msg
						.alert("Failed",
								"Something went wrong.Please Try again");
			}
			
		},
		failure : function(result, request) {
			//Hiding Loader 
			Ext.get('myModal').hide();
			Ext.select('.loader1').hide();
			Ext.Msg.alert("Failed", "Something went wrong.Please Try again");
		}
	});

}


var mainCard = Ext.create('Ext.panel.Panel', {
	title : 'View',
	bodyStyle : {
		"background-color" : "DarkTurquoise"
	},
	width : 100,
	// overflowY: 'scroll',
	/*
	 * border:1, style:{ borderColor: 'black', borderStyle: 'solid' },
	 */
	items : [ search, card ],
	 listeners: {
		 afterrender: function() {
				//Calling Loader 
				Ext.get('myModal').show();
				Ext.select('.loader1').show();
	            fetchData("fetch", null, null);
	        }
	    }
});

var logout = Ext.create('Ext.Button', {
	html : '<b>LogOut</b>',
	layout : {
		type : 'absolute'
	},
	x:'92%',
	width : 100,
	height : 40,
	handler : function() {
		Ext.Ajax.request({
			url : 'logOut.action',
			method : 'GET',
			reader : {
				type : 'json', // assigning typeof response
			},
			success : function(result, request) {
				
				var data = Ext.decode(result.responseText, true);

				if (data.status == "success") {// if response length is not
												// equal to zero
					 window.location.assign(data.url);
				} else {
					Ext.Msg.alert("Failed", data.message);
				}

			},
			failure : function(result, request) {
				Ext.Msg.alert("Failed",data.message);
			}
		});
	}
});


var home = Ext.create('Ext.panel.Panel', {
	title : 'Home',
	/*bodyStyle : {
		"background-color" : "DarkTurquoise"
	},*/
	bodyStyle: {
        'background': 'url(./js/images/backgroundImage.jpg)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom left',
        	 },
	  /*overflowY: 'scroll',*/
        	 width:100,
		html : '<h1 style="text-align:center;margin-top:18%;color: rgb(199,21,133);  letter-spacing: 5px; padding: 10px; font-size: 22px;">Welcome '+Ext.get("userName").getValue().split(",")[1]+' to Todo App Made by Satish Singh<h1>',
		items:[logout]
});




var tabpanel = Ext.create('Ext.TabPanel', {
	fullscreen : true,
	width : '100%',
	height : 700,
	id : 'tabsar',
	tabBar : {
		layout : {
			pack : 'center'
		}
	},
	defaults : {
		styleHtmlContent : true
	},
	/*
	 * style: { //This style is used to identify the panel which helps during UI
	 * creation borderColor: 'yellow', borderStyle: 'solid', borderWidth: '3px' },
	 */
	items : [home, mainCard, addPanel ]
});

// Creating a onready function which execute only when all the components are
// ready
Ext.onReady(function() {
	// This is the paren panel
	Ext.create('Ext.panel.Panel', {
		width : '100%',
		height : 700,
		/*
		 * style: { //This style is used to identify the panel which helps
		 * during UI creation borderColor: 'Tomato', borderStyle: 'solid',
		 * borderWidth: '3px' },
		 */
		renderTo : Ext.getBody(),
		items : [ tabpanel ]
	}); // End of parent panel
});// End of onReady function
