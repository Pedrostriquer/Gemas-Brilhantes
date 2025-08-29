// Dentro de src/services/apiService.js

import axios from "axios";

const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;

export const getContractSettings = async () => {
  try {
    const response = await axios.get(`${BASE_ROUTE}contractsettings`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter configurações:", error);
    throw error;
  }
};

export const getAvailableMonths = async () => {
  try {
    const response = await axios.get(`${BASE_ROUTE}contract/rules/available-months`);
    return response.data || [];
  } catch (error) {
    console.error("Erro ao obter meses disponíveis:", error);
    return [];
  }
};

export const simulateContract = async (data) => {
  try {
    const response = await axios.post(`${BASE_ROUTE}contract/simulate`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao simular contrato:", error);
    throw error;
  }
};