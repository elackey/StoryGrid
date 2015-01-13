Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
            models: ['defect'],
            autoLoad: true,
            enableHierarchy: true
        }).then({
            success: this._onStoreBuilt,
            scope: this
        });
    },
            
    _onStoreBuilt: function(store) {
        this.add({
            xtype: 'rallytreegrid',
            context: this.getContext(),
            store: store,
            columnCfgs: [
                'Name',
                'ScheduleState',
                'Owner',
                'Requirement'
            ]
        });
    }
});
