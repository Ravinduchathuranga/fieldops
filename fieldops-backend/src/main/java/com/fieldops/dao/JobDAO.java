package com.fieldops.dao;

import com.fieldops.config.HibernateUtil;
import com.fieldops.model.Job;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class JobDAO {

    // GET ALL JOBS
    public List<Job> getAllJobs() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("from Job", Job.class).list();
        }
    }

    // GET JOB BY ID
    public Job getJobById(int id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.get(Job.class, id);
        }
    }

    // CREATE JOB
    public Job saveJob(Job job) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.persist(job);
            tx.commit();
            return job;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        }
    }

    // UPDATE JOB
    public Job updateJob(Job job) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.merge(job);
            tx.commit();
            return job;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        }
    }

    // DELETE JOB
    public boolean deleteJob(int id) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Job job = session.get(Job.class, id);
            if (job == null) return false;
            tx = session.beginTransaction();
            session.remove(job);
            tx.commit();
            return true;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        }
    }
}
