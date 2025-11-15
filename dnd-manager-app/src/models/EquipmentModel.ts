export interface Equipment {
  index: string;
  name: string;
  url: string;
}

export interface ExtentedEquipment extends Equipment {
  cost: number;
}
