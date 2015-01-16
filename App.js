Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
            models: ['userStory'],
            autoLoad: true,
            enableHierarchy: true,
            filters: [{
                property: 'Parent.ObjectID',
                operator: '!contains',
                value: null
            }],
            fetch: [
                'Name',
                'Release',
                'Iteration',
                'ScheduleState',
                'PlanEstimate',
                'TaskEstimateTotal',
                'TaskRemainingTotal',
                'Owner',
                'Parent'
            ]
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
                'Release',
                'Iteration',
                'ScheduleState',
                'PlanEstimate',
                'TaskEstimateTotal',
                'TaskRemainingTotal',
                'Owner',
                'Parent',
                'Parent.Project.Name'
            ]
        });
    }
});
