import { create } from "zustand";

export const useEventStore = create((set) => ({
  event: null,
  loading: false,
  error: null,
  registrationId: localStorage.getItem("techfusion_reg_id") || null,

  // 🔹 Set loading state
  setLoading: (val) => set({ loading: val }),

  // 🔹 Set event data
  setEvent: (data) =>
    set({
      event: data,
      loading: false,
      error: null,
    }),

  // 🔹 Set error
  setError: (err) =>
    set({
      error: err,
      loading: false,
    }),

  // 🔹 Reset everything (useful later)
  resetEvent: () =>
    set({
      event: null,
      loading: false,
      error: null,
    }),

  // 🔹 Registration ID handling
  setRegistrationId: (id) => {
    localStorage.setItem("techfusion_reg_id", id);
    set({ registrationId: id });
  },

  clearRegistrationId: () => {
    localStorage.removeItem("techfusion_reg_id");
    set({ registrationId: null });
  },
}));