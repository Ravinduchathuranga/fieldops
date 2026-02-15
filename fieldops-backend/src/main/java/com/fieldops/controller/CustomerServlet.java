package com.fieldops.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fieldops.dao.CustomerDAO;
import com.fieldops.model.Customer;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.List;

public class CustomerServlet extends HttpServlet {

    private final CustomerDAO customerDAO = new CustomerDAO();
    private final ObjectMapper mapper = new ObjectMapper();

    // GET /api/customers or /api/customers?id=1
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        String idParam = req.getParameter("id");

        if (idParam != null) {
            int id = Integer.parseInt(idParam);
            Customer customer = customerDAO.getCustomerById(id);
            if (customer == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Customer not found\"}");
                return;
            }
            mapper.writeValue(resp.getOutputStream(), customer);
        } else {
            List<Customer> customers = customerDAO.getAllCustomers();
            mapper.writeValue(resp.getOutputStream(), customers);
        }
    }

    // POST /api/customers
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");

        Customer customer = mapper.readValue(req.getInputStream(), Customer.class);
        Customer savedCustomer = customerDAO.saveCustomer(customer);
        mapper.writeValue(resp.getOutputStream(), savedCustomer);
    }

    // PUT /api/customers?id=1
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        String idParam = req.getParameter("id");
        if (idParam == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Customer ID required\"}");
            return;
        }

        int id = Integer.parseInt(idParam);
        Customer existingCustomer = customerDAO.getCustomerById(id);
        if (existingCustomer == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Customer not found\"}");
            return;
        }

        Customer updatedCustomer = mapper.readValue(req.getInputStream(), Customer.class);
        updatedCustomer.setId(id);

        Customer savedCustomer = customerDAO.updateCustomer(updatedCustomer);
        mapper.writeValue(resp.getOutputStream(), savedCustomer);
    }

    // DELETE /api/customers?id=1
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        String idParam = req.getParameter("id");
        if (idParam == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Customer ID required\"}");
            return;
        }

        int id = Integer.parseInt(idParam);
        boolean deleted = customerDAO.deleteCustomer(id);
        if (deleted) {
            resp.getWriter().write("{\"message\":\"Customer deleted successfully\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Customer not found\"}");
        }
    }
}
