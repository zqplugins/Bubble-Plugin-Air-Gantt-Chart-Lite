function(instance, properties, context) {

    if (instance.data.i < 1) {
        let style = `<style>
.gantt-elastic__task-list-item-value-wrapper:hover > *{
background-color: ${properties.main_view_background} !important;
}
</style>`;
        $('head').append(style);
        instance.canvas.innerHTML = "";
        instance.data.i += 1;
    }
    instance.data.properties = properties;


    // #7
    // if(!properties.show_hours){
    //     $(".gantt-elastic__calendar-row-hour").css('display', 'none');
    //     $(".gantt-elastic__calendar-row-rect").css('height', '30px');
    //     $(".gantt-elastic__calendar-row-text").css('margin-top', '5px');
    // }else{
    //     // && $(".gantt-elastic__calendar-row-hour>div").length == 0
    //     $(".gantt-elastic__calendar-row-hour").css('height', '20px');
    //     $(".gantt-elastic__calendar-row-hour").css('display', 'flex');
    //     $(".gantt-elastic__calendar-row-rect").css('height', '20px');
    //     $(".gantt-elastic__calendar-row-text").css('margin-top', '0px');
    // }
    
    $(".gantt-elastic__calendar-row-hour").css('height', '20px');
    $(".gantt-elastic__calendar-row-hour").css('display', 'flex');
    $(".gantt-elastic__calendar-row-rect").css('height', '20px');
    $(".gantt-elastic__calendar-row-text").css('margin-top', '0px');
    // #7


    if (!properties.tasks_source) return;

    instance.data.tasksS = properties.tasks_source.get(0, properties.tasks_source.length());

    instance.data.tasks = instance.data.tasksS.map(task => {
        const id = task.get(properties.task_id);
        const label = task.get(properties.task_label);
        const start = task.get(properties.task_start);
        const duration = task.get(properties.task_duration);
        const progress = task.get(properties.task_progress);
        // const type = task.get(properties.task_type); // #2
        const type = 'task'; // #2
        let style = {
            base: {
                fill: '#8E44AD',
                stroke: 'transparent'
            }
        };

        // #2
        // if (type === 'project')
        //     style = {
        //         base: {
        //             fill: '#F95C4C',
        //             stroke: 'transparent'
        //         }
        //     };
        // if (type === 'project' && properties.project_color)
        //     style = {
        //         base: {
        //             fill: properties.project_color,
        //             stroke: 'transparent'
        //         }
        //     };

        // if (type === 'milestone')
        //     style =  {
        //         base: {
        //             fill: '#0287D0',
        //             stroke: 'transparent'
        //         }
        //     };
        // if (type === 'milestone' && properties.milestone_color)
        //     style = {
        //         base: {
        //             fill: properties.milestone_color,
        //             stroke: 'transparent'
        //         }
        //     };
        // #2

        if (properties.task_color)
            style = {
                base: {
                    fill: properties.task_color,
                    stroke: 'transparent'
                }
            };

        // const collapsed = task.get(properties.task_collapsed) || []; // #3
        let user = task.get(properties.task_user) || '';

        // const parentId =  task.get(properties.task_parent)|| null; // #3
        const dependentOn = task.get(properties.task_depend_on) || null;

        task = {};

        (id) && (task.id = id);
        (label) && (task.label = label);
        (start) && (task.start = start);
        (duration) && (task.duration = duration);
        (progress != undefined || progress != null) && (task.progress = progress);
        // (type) && (task.type = type); // #2
        task.type = type; // #2
        (style) && (task.style = style);
        // (collapsed) && (task.collapsed = collapsed); // #3
        (user) && (task.user = user);
        // (parentId) && (task.parentId = parentId); // #3
        task.parentId = null; // #3
        (dependentOn) && (task.dependentOn = dependentOn.get(0, dependentOn.length()));

        return task;
    });
    if (instance.data.i < 2) {
        instance.data.init();
        instance.data.i += 1;
    }


    // (properties.show_task_list !== null || properties.task_list_percent !== null) && (instance.data.gantt.options = {...instance.data.gantt.options, taskList: {display: properties.show_task_list, percent: properties.task_list_percent}}); // #5

    (properties.scale_x !== null) && (instance.data.gantt.options = { ...instance.data.gantt.options, times: { timeZoom: Number(instance.data.properties.scale_x) } });

    (properties.scale_y !== null) && (instance.data.gantt.options = { ...instance.data.gantt.options, row: { height: Number(instance.data.properties.scale_y) } });

    //(properties.show_header !== null) && (instance.data.gantt.showHeader = properties.show_header);
    //instance.canvas.style.height = 'auto';

    instance.data.refresh = function () {
        instance.data.properties = properties;
        instance.data.tasksS = properties.tasks_source.get(0, properties.tasks_source.length());
        instance.data.tasks = instance.data.tasksS.map(task => {
            const id = task.get(properties.task_id);
            const label = task.get(properties.task_label);
            const start = task.get(properties.task_start);
            const duration = task.get(properties.task_duration);
            const progress = task.get(properties.task_progress);
            // const type = task.get(properties.task_type); // #2
            const type = 'task'; // #2
            let style = {
                base: {
                    fill: '#8E44AD',
                    stroke: 'transparent'
                }
            };

            // #2
            // if (type === 'project')
            //     style = {
            //         base: {
            //             fill: '#F95C4C',
            //             stroke: 'transparent'
            //         }
            //     };
            // if (type === 'project' && properties.project_color)
            //     style = {
            //         base: {
            //             fill: properties.project_color,
            //             stroke: 'transparent'
            //         }
            //     };

            // if (type === 'milestone')
            //     style =  {
            //         base: {
            //             fill: '#0287D0',
            //             stroke: 'transparent'
            //         }
            //     };
            // if (type === 'milestone' && properties.milestone_color)
            //     style = {
            //         base: {
            //             fill: properties.milestone_color,
            //             stroke: 'transparent'
            //         }
            //     };
            // #2

            if (properties.task_color)
                style = {
                    base: {
                        fill: properties.task_color,
                        stroke: 'transparent'
                    }
                };
            // const collapsed = task.get(properties.task_collapsed) || []; // #3
            let user = task.get(properties.task_user) || '';
            // const parentId =  task.get(properties.task_parent)|| null; // #3
            const dependentOn = task.get(properties.task_depend_on) || null;
            task = {};
            (id) && (task.id = id);
            (label) && (task.label = label);
            (start) && (task.start = start);
            (duration) && (task.duration = duration);
            (progress != undefined || progress != null) && (task.progress = progress);
            // (type) && (task.type = type); // #2
            task.type = type; // #2
            (style) && (task.style = style);
            // (collapsed) && (task.collapsed = collapsed); // #3
            (user) && (task.user = user);
            // (parentId) && (task.parentId = parentId); // #3
            task.parentId = null; // #3
            (dependentOn) && (task.dependentOn = dependentOn.get(0, dependentOn.length()));
            return task;
        });
        instance.data.gantt.tasks = instance.data.tasks;
    }


}