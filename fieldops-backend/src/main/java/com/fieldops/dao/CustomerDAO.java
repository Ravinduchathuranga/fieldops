package com.fieldops.dao;

import com.fieldops.config.HibernateUtil;
import com.fieldops.model.Customer;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class CustomerDAO {
    private Transaction tx = null;

    // GET ALL CUSTOMERS WITH JOBS INITIALIZED
    public List<Customer> getAllCustomers() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            List<Customer> customers = session.createQuery("from Customer", Customer.class).list();

            // Initialize jobs for each customer to avoid LazyInitializationException
            for (Customer c : customers) {
                Hibernate.initialize(c.getJobs());
            }
            return customers;
        }
    }

    // GET CUSTOMER BY ID WITH JOBS INITIALIZED
    public Customer getCustomerById(int id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Customer customer = session.get(Customer.class, id);
            if (customer != null) {
                Hibernate.initialize(customer.getJobs()); // Load lazy collection
            }
            return customer;
        }
    }

    // CREATE CUSTOMER
    public Customer saveCustomer(Customer customer) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.persist(customer);
            tx.commit();
            return customer;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        }
    }

    // UPDATE CUSTOMER
    public Customer updateCustomer(Customer customer) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            Customer updated = (Customer) session.merge(customer);
            tx.commit();
            return updated;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        }
    }

    // DELETE CUSTOMER
    public boolean deleteCustomer(int id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Customer customer = session.get(Customer.class, id);
            if (customer == null) return false;
            tx = session.beginTransaction();
            session.remove(customer);
            tx.commit();
            return true;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        }
    }
}
