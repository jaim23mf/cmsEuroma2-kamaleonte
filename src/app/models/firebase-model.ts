
export interface Firebase{
    id:Number;
    title:String;
    name?:String;
    image?:String;
    msg:String;
    target:TargetType;
    notificationType:NotificationType;
    notificationId:Number;
    notificationName?:String;
    date:Date;
    editable?:boolean;
    //schedule?:String;
}

export enum TargetType {
    promotionIt,
    promotionEn,
    eventsIt ,
    eventsEn ,
    newOpeningIt,
    newOpeningEn ,
    none
  };

  export enum NotificationType {
    promotion,
    newOpening ,
    events ,
    none 
  };

  export interface NotificationIds{
    id:Number,
    title:string
  };