function(instance, context) {
    instance.data.i = 0;

    instance.data.init = function(){
        instance.data.ganttWrapper = document.createElement('div');
        instance.data.ganttWrapper.style.width = '100%';
        instance.data.ganttWrapper.style.height = '100%';
        instance.data.ganttWrapper.style.minHeight = 'auto';
        instance.data.ganttWrapper.style.overflowY = 'auto';
        instance.data.ganttApp = document.createElement('div');
        instance.data.ganttApp.style.width = '100%';
        instance.data.ganttApp.style.height = '100%';
        instance.data.ganttWrapper.appendChild(instance.data.ganttApp);
        instance.canvas[0].appendChild(instance.data.ganttWrapper);

        instance.data.options = {
            slots: {
                header: {
                    beforeOptions: ''
                }
            },
            row: {
                height: Number(instance.data.properties.scale_y), //24
            },
            times: {
                timeZoom: Number(instance.data.properties.scale_x), //10
            },
            maxRows: 100,
            title: {
                label: '',
                html: false,
            },
            style: {
                "main-view": {
                    "background": instance.data.properties.main_view_background ? instance.data.properties.main_view_background : "transparent",
                    "color": instance.data.properties.main_view_color ? instance.data.properties.main_view_color : "#000",
                    "max-width": "200",
                },
                "task-list-item-value": {
                    "background": "transparent",
                },
                "chart-row-text": {
                    "background": "transparent!important",
                },
                "task-list-header-column": {
                    "background": instance.data.properties.header_background ? instance.data.properties.header_background : "#f3f5f7",
                    "color": instance.data.properties.header_color ? instance.data.properties.header_color : "#000",
                },
                "calendar": {
                    "background": instance.data.properties.header_background ? instance.data.properties.header_background : "#f3f5f7",
                    "color": instance.data.properties.header_color ? instance.data.properties.header_color : "#000",
                },
                "calendar-row-text--month": {
                    "color": instance.data.properties.header_color ? instance.data.properties.header_color : "#000",
                },
                "calendar-row-text--day": {
                    "color": instance.data.properties.header_color ? instance.data.properties.header_color : "#000",
                },
                "calendar-row-text--hour": {
                    "color": instance.data.properties.header_color ? instance.data.properties.header_color : "#000",
                },
                "chart-days-highlight-rect": {
                    "fill": "transparent",
                },
                // #4
                // "chart-row-progress-bar-solid": {
                //     "fill": instance.data.properties.show_progress == false ? "rgb(14, 172, 81)" : "transparent",
                // }
                // #4
            },
            calendar: {
                hour: {
                    // display: instance.data.properties.show_hours, // #7
                    display: true, // #7
                },
            },
            chart: {
                progress: {
                    bar: false, // #4
                },
                expander: {
                    // display: instance.data.properties.display_chart_expander, // #3
                    display: false, // #3
                },
            },
            taskList: {
                display: true,
                expander: {
                    straight: true,
                },
                // percent: instance.data.properties.task_list_percent, // #5
                percent: 100, // #5
                columns: [
                    {
                        id: 1,
                        label: instance.data.properties.column_one_name,//ID
                        value: 'id',
                        width: !instance.data.properties.show_column_one ? 0 : instance.data.properties.column_one_width, //40
                        html: false, // #1
                        // events: {
                        //     click({ data, column }) {
                        //         instance.triggerEvent('task_clicked');
                        //     },
                        // },
                    }, {
                        id: 2,
                        label: instance.data.properties.column_two_name, //Description
                        value: 'label',
                        width: !instance.data.properties.show_column_two ? 0 : instance.data.properties.column_two_width, //200
                        expander: true,
                        html: false, // #1
                    }, {
                        id: 3,
                        label: instance.data.properties.column_three_name, //Assigned to
                        value: 'user',
                        width: !instance.data.properties.show_column_three ? 0 : instance.data.properties.column_three_width, //130
                        html: false // #1
                    }, {
                        id: 4,
                        label: instance.data.properties.column_four_name, //Start
                        value: (task) => task.startDate.format('YYYY-MM-DD'),
                        width: !instance.data.properties.show_column_four ? 0 : instance.data.properties.column_four_width, //78
                        html: false, // #1
                    },
                    // #2
                    // {
                    //     id: 4,
                    //     label: instance.data.properties.column_five_name, //Type
                    //     value: 'type',
                    //     width: !instance.data.properties.show_column_five ? 0 : instance.data.properties.column_five_width, //68
                    //     html: false, // #1
                    // },
                    // #2
                    {
                        id: 5,
                        label: instance.data.properties.column_five_name, //%
                        value: 'progress',
                        width: !instance.data.properties.show_column_five ? 0 : instance.data.properties.column_five_width, //35
                        html: false, // #1
                        style: {
                            "task-list-header-label": {
                                'text-align': 'center',
                                'width': '100%'
                            },
                            "task-list-item-value-container": {
                                'text-align': 'center',
                            }
                        }
                    }
                ]
            },
            locale: {
                code: "en",
                'Now': 'Now',
                'X-Scale': 'Zoom-X',
                'Y-Scale': 'Zoom-Y',
                'Task list width': 'Task list',
                'Before/After': 'Expand',
                'Display task list': 'Task list'
            }
        };

        instance.data.gantt = GanttElastic.mount({
            el: instance.data.ganttApp,
            tasks: instance.data.tasks,
            options: instance.data.options,
            ready(gi) {
                instance.data.ganttInstance = gi;
                // #8
                // gi.$on('chart-task-click', ({ event, data }) => {returnData(data);});
                // gi.$on('chart-project-click', ({ event, data }) => {returnData(data);}); // #2
                // gi.$on('chart-milestone-click', ({ event, data }) => {returnData(data)}); // #2
                // gi.$on('chart-task-mouseenter', ({ event, data }) => {returnData2(data)});
                // gi.$on('chart-project-mouseenter', ({ event, data }) => {returnData2(data)}); // #2
                // gi.$on('chart-milestone-mouseenter', ({ event, data }) => {returnData2(data)}); // #2
                // #8
            }
        });

        // #8
        // const returnData = (data) => {
        //     (data.id) && (instance.publishState('id', data.id));
        //     (data.label) && (instance.publishState('label', data.label));
        //     (data.start) && (instance.publishState('start', data.start));
        //     (data.duration) && (instance.publishState('duration', data.duration));
        //     (data.progress) && (instance.publishState('progress', data.progress));
        //     // (data.type) && (instance.publishState('type', data.type)); // #2
        //     // (data.parentId) && (instance.publishState('parent', data.parentId)); // #3
        //     (data.dependentOn) && (instance.publishState('dependent_on', data.dependentOn));
        //     instance.triggerEvent('task_clicked');
        // };
        // const returnData2 = (data) => {
        //     (data.id) && (instance.publishState('id_hover', data.id));
        //     (data.label) && (instance.publishState('label_hover', data.label));
        //     (data.start) && (instance.publishState('start_hover', data.start));
        //     (data.duration) && (instance.publishState('duration_hover', data.duration));
        //     (data.progress) && (instance.publishState('progress_hover', data.progress));
        //     // (data.type) && (instance.publishState('type_hover', data.type)); // #2
        //     // (data.parentId) && (instance.publishState('parent_hover', data.parentId)); // #3
        //     (data.dependentOn) && (instance.publishState('dependent_hover', data.dependentOn));
        //     instance.triggerEvent('task_hover');
        // };
        // #8

    }




    /* instance.data.ganttWrapper = document.createElement('div');
    instance.data.ganttWrapper.style.width = '100%';
    instance.data.ganttWrapper.style.height = '100%';
    instance.data.ganttWrapper.style.minHeight = 'auto';
    instance.data.ganttWrapper.style.overflowY = 'auto';

    let ganttApp = document.createElement('div');
    ganttApp.style.width = '100%';
    ganttApp.style.height = '100%';

    instance.data.ganttWrapper.appendChild(ganttApp);

    instance.canvas.appendChild(instance.data.ganttWrapper);

*/

    /*const options = {
        slots: {
            header: {
                beforeOptions: ''
            }
        },
        row: {
            height: 24
        },
        times: {
            timeZoom: 10
        },
        maxRows: 100,
        title: {
            label: '',
            html: false,
        },
        style: {
            "main-view": {
                "background": "transparent",
                "max-width": "200"
            },
        },
        taskList: {
            display: true,
            expander: {
                straight: true
            },
            columns: [
                {
                    id: 1,
                    label: instance.data.properties.column_one_name,//ID
                    value: 'id',
                    width: 40
                }, {
                    id: 2,
                    label: 'Description',
                    value: 'label',
                    width: 200,
                    expander: true
                }, {
                    id: 3,
                    label: 'Assigned to',
                    value: 'user',
                    width: 130,
                    html: true
                }, {
                    id: 3,
                    label: 'Start',
                    value: (task) => task.startDate.format('YYYY-MM-DD'),
                    width: 78
                }, {
                    id: 4,
                    label: 'Type',
                    value: 'type',
                    width: 68
                }, {
                    id: 5,
                    label: '%',
                    value: 'progress',
                    width: 35,
                    style: {
                        "task-list-header-label": {
                            'text-align': 'center',
                            'width': '100%'
                        },
                        "task-list-item-value-container": {
                            'text-align': 'center',
                        }
                    }
                }
            ]
        },
        locale: {
            code: "en",
            'Now': 'Now',
            'X-Scale': 'Zoom-X',
            'Y-Scale': 'Zoom-Y',
            'Task list width': 'Task list',
            'Before/After': 'Expand',
            'Display task list': 'Task list'
        }
    };

    */
    /* let ganttInstance;

    instance.data.gattInitializate = function(){
        const gantt = GanttElastic.mount({
            el: ganttApp,
            tasks: [],
            options: instance.data.options,
            ready(gi) {
                ganttInstance = gi;
                gi.$on('chart-task-click', ({ event, data }) => {returnData(data);});
                gi.$on('chart-project-click', ({ event, data }) => {returnData(data);});
                gi.$on('chart-milestone-click', ({ event, data }) => {returnData(data)});
            }
        });


        const returnData = (data) => {
            (data.id) && (instance.publishState('id', data.id));
            (data.label) && (instance.publishState('label', data.label));
            (data.start) && (instance.publishState('start', data.start));
            (data.duration) && (instance.publishState('duration', data.duration));
            (data.progress) && (instance.publishState('progress', data.progress));
            (data.type) && (instance.publishState('type', data.type));
            (data.parentId) && (instance.publishState('parent', data.parentId));
            (data.dependentOn) && (instance.publishState('dependent_on', data.dependentOn));
            instance.triggerEvent('task_clicked');
        };

        instance.data.gantt = gantt;
        instance.data.ganttInstance = ganttInstance;

    }
*/
}