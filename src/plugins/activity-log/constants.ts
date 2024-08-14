export const ACTIVITY_LOG_PLUGIN_OPTIONS = Symbol('ACTIVITY_LOG_PLUGIN_OPTIONS');
export const loggerCtx = 'ActivityLogPlugin';
export type DefaultActivityType=  "created" 
 | "updated" 
 | "deleted";

export type OrderRelatedActivityType= 
"fulfillment_state_transition"|
"order_state_transition"|
 "refund_state_transition";

export type CollectionRelatedActivityType='collection_modification';
export type GroupChangeEventType='assigned' | 'removed';