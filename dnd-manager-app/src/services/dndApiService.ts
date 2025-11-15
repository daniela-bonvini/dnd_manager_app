import type { Equipment, ExtentedEquipment } from "../models/EquipmentModel";

const BASE_URL = "https://www.dnd5eapi.co/api/2014";

//do models for return types

export async function getAllEquipment() {
  const response = await fetch(`${BASE_URL}/equipment`);
  const data = await response.json();
  const extendedEquipmentList: ExtentedEquipment[] = data.results.map((item: Equipment) => ({
    index: item.index,
    name: item.name,
    url: item.url,
    cost: Math.floor(Math.random() * 500) + 1, // Mock cost data
  }));
  return extendedEquipmentList;
}

export async function getEquipment(index: string) {
  const response = await fetch(`${BASE_URL}/equipment/${index}`);
  const data = await response.json();
  const mappedData: ExtentedEquipment = {
    index: data.index,
    name: data.name,
    url: data.url,
    cost: data.cost ? data.cost.quantity : Math.floor(Math.random() * 500) + 1, // Use actual cost if available, else mock
  };
  return mappedData;
}

export async function getAllSpells() {
  const response = await fetch(`${BASE_URL}/spells`);
  const data = await response.json();
  return data;
}

export async function getSpell(index: string) {
  const response = await fetch(`${BASE_URL}/spells/${index}`);
  const data = await response.json();
  return data;
}
