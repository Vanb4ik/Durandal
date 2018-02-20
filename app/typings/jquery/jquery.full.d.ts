declare module "jquery.full" {
    export = $;
} 
interface JQuery
{
    slider(options?: any): JQuery;
    draggable(): JQuery;
    //scrollpanel();
    //datepicker(options: any): JQuery;
    //datepicker(method:string, value:string): JQuery;
    //datepicker(method:string, key:string, value:any): JQuery;
    //splitter(options: any): JQuery;
    //highlight(value: string, options: any): JQuery;
    //niceScroll(selector: string, options: any): JQuery;
}
declare var $: JQueryStatic;