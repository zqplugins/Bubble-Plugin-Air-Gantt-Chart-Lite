function(instance, properties, context) {
    if (!instance.data.gantt) return;
    instance.data.ganttInstance.$emit("recenterPosition");
}