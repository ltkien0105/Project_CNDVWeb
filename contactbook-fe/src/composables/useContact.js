import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import makeContactsService from "../services/contacts.service";

const {
  getContacts,
  createContact,
  deleteAllContacts,
  getContact,
  updateContact,
  deleteContact,
} = makeContactsService;

export function useContact() {
  const queryClient = useQueryClient();

  function getContactItem(id) {
    const { data: contactItem, ...rest } = useQuery({
      queryKey: ["contact", id],
      queryFn: () => getContact(id),
      initialData: [],
      keepPreviousData: true,
    });

    return {
      contact: contactItem,
      ...rest,
    };
  }

  const createContactMutation = useMutation({
    mutationFn: createContact,
    onSuccess: (data) => {
      queryClient.setQueryData(["contact"], data);
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: (data) => {
      queryClient.setQueryData(["contact"], data);
    },
  });

  const deleteAllContactsMutation = useMutation({
    mutationFn: deleteAllContacts,
    onSuccess: (data) => {
      queryClient.setQueryData(["contact"], data);
    },
  });

  const updateContactMutation = useMutation({
    mutationFn: updateContact,
    onSuccess: (data) => {
      queryClient.setQueryData(["contact"], data);
    },
  });

  // Get contacts for a specific pages and order them by name
  function retrieveContacts(page) {
    const { data: contactItems, refetch } = useQuery({
      queryKey: ["contacts", page],
      queryFn: () => getContacts(page),
      initialData: {
        contacts: [],
        metadata: {
          lastPage: 1,
        },
      },
      keepPreviousData: true,
    });

    const totalPages = computed(() => {
      return contactItems.value.metadata.lastPage ?? 1;
    });
    const contacts = computed(() => {
      const tempContacts = contactItems.value.contacts.map(
        (contact) => contact
      );
      return tempContacts.sort((current, next) =>
        current.name.localeCompare(next.name)
      );
    });

    return {
      contacts,
      totalPages,
      refetch,
    };
  }

  return {
    getContactItem,
    retrieveContacts,
    createContact: createContactMutation.mutate,
    deleteContact: deleteContactMutation.mutate,
    deleteAllContacts: deleteAllContactsMutation.mutate,
    updateContact: updateContactMutation.mutate,
  };
}
