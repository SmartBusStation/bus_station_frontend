// src/lib/services/bus-station-service.ts
import { BusStation, Agency, Trip, AffiliationTax, PolicyAndTax, BusStationManagerAccount } from "@/lib/types/bus-station";
const API_BASE_URL = "http://localhost:3001";

export const getBusStationDetails = async (
  stationId: string
): Promise<BusStation> => {
  const response = await fetch(`${API_BASE_URL}/gares/${stationId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch bus station details");
  }
  return response.json();
};

export const getAffiliatedAgencies = async (
  stationId: string
): Promise<Agency[]> => {
  const response = await fetch(`${API_BASE_URL}/agences`);
  if (!response.ok) {
    throw new Error("Failed to fetch agencies");
  }
  const agencies: Agency[] = await response.json();
  return agencies.filter((agency) => agency.gareIds.includes(stationId));
};

export const getTripsByAgencies = async (
  agencyIds: string[]
): Promise<Trip[]> => {
  const response = await fetch(`${API_BASE_URL}/departs`);
  if (!response.ok) {
    throw new Error("Failed to fetch trips");
  }
  const trips: Trip[] = await response.json();
  return trips.filter((trip) => agencyIds.includes(trip.agencyId));
};

export const getAffiliationTaxes = async (
  stationId: string
): Promise<AffiliationTax[]> => {
  const response = await fetch(`${API_BASE_URL}/affiliationTaxes`);
  if (!response.ok) {
    throw new Error("Failed to fetch affiliation taxes");
  }
  const taxes: AffiliationTax[] = await response.json();
  return taxes.filter((tax) => tax.stationId === stationId);
};

export const getPoliciesAndTaxes = async (
  stationId: string
): Promise<PolicyAndTax[]> => {
  const response = await fetch(`${API_BASE_URL}/policiesAndTaxes`);
  if (!response.ok) {
    throw new Error("Failed to fetch policies and taxes");
  }
  const policies: PolicyAndTax[] = await response.json();
  return policies.filter((p) => p.stationId === stationId);
};

export const getBusStationManagerAccount = async (
  busStationId: string
): Promise<BusStationManagerAccount> => {
  const response = await fetch(`${API_BASE_URL}/busStationManagerAccount`);
  if (!response.ok) {
    throw new Error("Failed to fetch bus station manager account");
  }
  const account: BusStationManagerAccount = await response.json();
  if (account.busStationId !== busStationId) {
    throw new Error("Account not found for this bus station");
  }
  return account;
};
