/**
MIT LICENSE

Copyright 2013-2016 Lebedev Konstantin ibnRubaXa@gmail.com http://rubaxa.github.io/Sortable/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

declare module SortableMembers
{

    interface ISortableEvent extends Event
    {
    }

    interface IOnStartEvent extends ISortableEvent
    {
        /**
     * Element index within parent.
     */
        oldIndex: number;
    }

    interface IOnEndEvent extends IOnStartEvent
    {
        /**
     * Element new index within parent.
     */
        newIndex: number;
    }

    interface IOnAddEvent extends IOnEndEvent
    {
        /**
     * Previous list.
     */
        from: HTMLElement;
        /**
     * Dragged HTMLElement.
     */
        item: HTMLElement;
    }

    interface IOnUpdateEvent extends IOnEndEvent
    {
        /**
     * Dragged HTMLElement.
     */
        item: HTMLElement;
    }

    interface IOnSortEvent extends IOnUpdateEvent
    {
    }

    interface IOnRemoveEvent extends IOnUpdateEvent
    {
    }

    interface IOnFilterEvent extends IOnEndEvent
    {
        /**
     * HTMLElement receiving the `mousedown|tapstart` event.
     */
        item: HTMLElement;
    }

    interface IOnMoveEvent extends ISortableEvent
    {
        /**
     * Dragged HTMLElement.
     */
        dragged: HTMLElement;
        /**
     * TextRectangle {left, top, right и bottom}
     */
        draggedRect: ITextRectangle;
        /**
     * HTMLElement on which have guided.
     */
        related: HTMLElement;
        /**
     * TextRectangle {left, top, right и bottom}
     */
        relatedRect: ITextRectangle;
        // return false; — for cancel
    }


    interface ITextRectangle
    {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }

    interface IStore
    {
        /**
         * Get the order of elements. Called once during initialization.
         * @param   {Sortable}  sortable
         * @returns {Array}
         */
        get: (sortable: ISortableStatic) => Array<number>;
        /**
         * Save the order of elements. Called onEnd (when the item is dropped).
         * @param {Sortable}  sortable
         */
        set: (sortable: ISortableStatic) => void;
    }

    type OnStartEventHandler = (e: IOnStartEvent) => void;
    type OnEndEventHandler = (e: IOnEndEvent) => void;
    type OnAddEventHandler = (e: IOnAddEvent) => void;
    type OnUpdateEventHandler = (e: IOnUpdateEvent) => void;
    type OnSortEventHandler = (e: IOnSortEvent) => void;
    type OnRemoveEventHandler = (e: IOnRemoveEvent) => void;
    type OnFilterEventHandler = (e: IOnFilterEvent) => void;
    type OnMoveEventHandler = (e: IOnMoveEvent) => void | boolean;
    type SetDataEventHandler = (dataTransfer: (key: string, value: any) => void, dragElement: HTMLElement) => void;

    interface ISortableOptions
    {
        /**
         * "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
         */
        group?: string;

        /**
         * Sorting inside list.
         */
        sort?: boolean;

        /**
         * Time in milliseconds to define when the sorting should start.
         */
        delay?: number;

        /**
         * Disables the sortable if set to true.
         */
        disabled?: boolean;
        store?: IStore;

        /**
         * ms, animation speed moving items when sorting, `0` — without animation.
         */
        animation?: number; //150,  // 

        /**
         * Drag handle selector within list items.
         */
        handle?: string;

        /**
         * Selectors that do not lead to dragging (String or Function).
         */
        filter?: string | Function;

        /**
         * Specifies which items inside the element should be sortable.
         */
        draggable?: string;

        /**
         * Class name for the drop placeholder.
         */
        ghostClass?: string;
        /**
         * Class name for the chosen item.
         */
        chosenClass?: string;
        dataIdAttr?: string;

        forceFallback?: boolean; // false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

        /**
         * Class name for the cloned DOM Element when using forceFallback.
         */
        fallbackClass?: string; // 
        /**
         * Appends the cloned DOM Element into the Document's Body.
         */
        fallbackOnBody?: boolean;

        scroll?: boolean | HTMLElement;

        /**
         * how near the mouse must be to an edge to start scrolling. (px)
         */
        scrollSensitivity?: number;
        scrollSpeed?: number;

        setData?: SetDataEventHandler;
        
        /**
         * Dragging started.
         */
        onStart?: OnStartEventHandler;
        
        /**
         * Dragging ended.
         */
        onEnd?: OnEndEventHandler;
        
        /**
         * Element is dropped into the list from another list.
         */
        onAdd?: OnAddEventHandler;

        /**
         * Changed sorting within list.
         */
        onUpdate?: OnUpdateEventHandler;
        
        /**
         * Called by any change to the list (add / update / remove).
         */
        onSort?: OnSortEventHandler;
        
        /**
         * Element is removed from the list into another list.
         */
        onRemove?: OnRemoveEventHandler;

        /**
         * Attempt to drag a filtered element.
         */
        onFilter?: OnFilterEventHandler;

        /**
         * Event when you move an item in the list or between lists.
         */
        onMove?: OnMoveEventHandler;
    }
}

interface ISortableUtils
{
    /**
     * Attach an event handler function.
     * @param el 
     * @param event 
     * @param fn 
     */
    on(el: HTMLElement, event: String, fn: Function): void;
    /**
     * Remove an event handler.
     * @param el 
     * @param event 
     * @param fn 
     */
    off(el: HTMLElement, event: String, fn: Function): void;
    /**
     * Get the values of all the CSS properties.
     * @param el 
     * @returns {} 
     */
    css(el: HTMLElement): Object;
    /**
     * Get the value of style properties.
     * @param el 
     * @param prop 
     * @returns {} 
     */
    css(el: HTMLElement, prop: String): any;
    /**
     * Set one CSS properties.
     * @param el 
     * @param prop 
     * @param value 
     */
    css(el: HTMLElement, prop: String, value: String): void;
    
    /**
     * Set more CSS properties.
     * @param el 
     * @param props 
     */
    css(el: HTMLElement, props: Object): void;
    /**
     * Get elements by tag name.
     * @param ctx 
     * @param tagName 
     * @param iterator 
     * @returns Array<HTMLElement>
     */
    find(ctx: HTMLElement, tagName: String, iterator?: Function): Array<HTMLElement>;
    /**
     * Takes a function and returns a new one that will always have a particular context.
     * @param ctx 
     * @param fn 
     * @returns Function
     */
    bind(ctx: any, fn: Function): Function;

    /**
     * Check the current matched set of elements against a selector.
     * @param el 
     * @param selector 
     * @returns boolean 
     */
    is(el: HTMLElement, selector: String): boolean;

    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param el 
     * @param selector 
     * @param ctx 
     * @returns HTMLElement 
     */
    closest(el: HTMLElement, selector: String, ctx?: HTMLElement): HTMLElement;

    /**
     * add or remove one classes from each element
     * @param el 
     * @param name 
     * @param state 
     * @returns {} 
     */
    toggleClass(el:HTMLElement, name:String, state:Boolean): void;
}

interface ISortableStatic
{
    /**
     * Create new instance.
     * @param element 
     * @param options 
     * @returns ISortable
     */
    create(element: HTMLElement, options?: SortableMembers.ISortableOptions): ISortable;
    /**
     * Link to the active instance.
     */
    active: ISortable;
    utils: ISortableUtils;
}
interface ISortable
{
    /**
     * Get or set the option.
     * @param element 
     * @param options 
     * @returns {} 
     */
    option(name: String, value: any): any;
    
    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param el 
     * @param selector 
     * @returns HTMLElement
     */
    closest(el: String, selector?: HTMLElement): HTMLElement;
    
    /**
     * Serializes the sortable's item data-id's (dataIdAttr option) into an array of string.
     * @returns String[] 
     */
    toArray(): String[];

    /**
     * Sorts the elements according to the array.
     * @param order 
     */
    sort(order: String[]): void;

    /**
     * Save the current sorting.
     */
    save(): void;

    /**
     * Removes the sortable functionality completely.
     * @returns {} 
     */
    destroy(): void;
}

declare module "sortable"
{
    export = Sortable;
}

declare var Sortable: ISortableStatic;