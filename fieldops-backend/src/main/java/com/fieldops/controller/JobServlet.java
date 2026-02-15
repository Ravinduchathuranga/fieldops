package com.fieldops.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fieldops.dao.JobDAO;
import com.fieldops.dao.CustomerDAO;
import com.fieldops.model.Job;
import com.fieldops.model.Customer;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.List;

public class JobServlet extends HttpServlet {

    private final JobDAO jobDAO = new JobDAO();
    private final CustomerDAO customerDAO = new CustomerDAO();
    private final ObjectMapper mapper = new ObjectMapper();

    // GET /api/jobs or /api/jobs?id=1
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        String idParam = req.getParameter("id");

        if (idParam != null) {
            int id = Integer.parseInt(idParam);
            Job job = jobDAO.getJobById(id);
            if (job == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Job not found\"}");
                return;
            }
            mapper.writeValue(resp.getOutputStream(), job);
        } else {
            List<Job> jobs = jobDAO.getAllJobs();
            mapper.writeValue(resp.getOutputStream(), jobs);
        }
    }

    // POST /api/jobs
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");

        Job job = mapper.readValue(req.getInputStream(), Job.class);

        // Validate customer exists
        Customer customer = customerDAO.getCustomerById(job.getCustomer().getId());
        if (customer == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Customer not found\"}");
            return;
        }
        job.setCustomer(customer);

        Job savedJob = jobDAO.saveJob(job);
        mapper.writeValue(resp.getOutputStream(), savedJob);
    }

    // PUT /api/jobs?id=1
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        String idParam = req.getParameter("id");
        if (idParam == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Job ID required\"}");
            return;
        }

        int id = Integer.parseInt(idParam);
        Job existingJob = jobDAO.getJobById(id);
        if (existingJob == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Job not found\"}");
            return;
        }

        Job updatedJob = mapper.readValue(req.getInputStream(), Job.class);

        // Validate customer exists
        Customer customer = customerDAO.getCustomerById(updatedJob.getCustomer().getId());
        if (customer == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Customer not found\"}");
            return;
        }

        updatedJob.setId(id);
        updatedJob.setCustomer(customer);

        Job savedJob = jobDAO.updateJob(updatedJob);
        mapper.writeValue(resp.getOutputStream(), savedJob);
    }

    // DELETE /api/jobs?id=1
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        String idParam = req.getParameter("id");
        if (idParam == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Job ID required\"}");
            return;
        }

        int id = Integer.parseInt(idParam);
        boolean deleted = jobDAO.deleteJob(id);
        if (deleted) {
            resp.getWriter().write("{\"message\":\"Job deleted successfully\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Job not found\"}");
        }
    }
}
