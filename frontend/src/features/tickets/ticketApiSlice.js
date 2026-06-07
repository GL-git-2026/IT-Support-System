import { apiSlice } from '../api/apiSlice';

export const ticketApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query({
            query: () => '/tickets',
            providesTags: ['Ticket'],
        }),
        getTicketById: builder.query({
            query: (id) => `/tickets/${id}`,
            providesTags: (result, error, id) => [{ type: 'Ticket', id }],
        }),
        createTicket: builder.mutation({
            query: (ticketData) => ({
                url: '/tickets',
                method: 'POST',
                body: ticketData,
            }),
            invalidatesTags: ['Ticket'],
        }),
        updateTicket: builder.mutation({
            query: ({ id, ...ticketData }) => ({
                url: `/tickets/${id}`,
                method: 'PUT',
                body: ticketData,
            }),
            invalidatesTags: (result, error, { id }) => ['Ticket', { type: 'Ticket', id }],
        }),
        deleteTicket: builder.mutation({
            query: (id) => ({
                url: `/tickets/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ticket'],
        }),
    }),
});

export const {
    useGetTicketsQuery,
    useGetTicketByIdQuery,
    useCreateTicketMutation,
    useUpdateTicketMutation,
    useDeleteTicketMutation,
} = ticketApiSlice;