const BASE_URL = "https://www.dnd5eapi.co/api/2014";

//do models for return types

export async function getAllEquipment() {
  const response = await fetch(`${BASE_URL}/equipment`);
  const data = await response.json();
  return data;
}

export async function getEquipment(index: string) {
  const response = await fetch(`${BASE_URL}/equipment/${index}`);
  const data = await response.json();
  return data;
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
