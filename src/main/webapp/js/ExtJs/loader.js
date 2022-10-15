var myPanel1 = new Ext.panel.Panel({
   // renderTo : document.body,
    height   : 100,
    width    : 200,
    title    : 'Foo'
});
Ext.onReady(function() {
var myPanel = new Ext.panel.Panel({
    renderTo : document.body,
    height   : 100,
    width    : 200,
    id:'dd',
    title    : 'Fo1o',
    items:[myPanel1]
});


});
var myMask = new Ext.LoadMask({
    msg    : 'Please wait...',
    target : Ext.getCmp('dd')
});

myMask.show();