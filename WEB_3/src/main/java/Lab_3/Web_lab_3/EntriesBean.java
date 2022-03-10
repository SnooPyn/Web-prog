package Lab_3.Web_lab_3;

import javax.faces.context.FacesContext;
import javax.persistence.*;
import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class EntriesBean implements Serializable {
    private static final String persistenceUnit = "StudsPU";

    private Entry entry;
    private List<Entry> entries;
    private String sessionId;

    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;
    private EntityTransaction transaction;

    public EntriesBean() {
        entry = new Entry();
        entries = new ArrayList<>();
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        sessionId = session.getId();

        connection();
        loadEntries();
    }

    private void connection() {
        entityManagerFactory = Persistence.createEntityManagerFactory(persistenceUnit);
        entityManager = entityManagerFactory.createEntityManager();
        transaction = entityManager.getTransaction();
    }

    private void loadEntries() {
        try {
            transaction.begin();
            Query query = entityManager.createQuery("SELECT e FROM Entry e WHERE e.sessionId = ?1");
            query.setParameter(1, sessionId);
            entries = query.getResultList();
            transaction.commit();
        } catch (RuntimeException exception) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            throw exception;
        }

    }

    public String addEntry() {
        try {
            transaction.begin();
            entry.checkHit();
            entry.setSessionId(sessionId);
            entityManager.persist(entry);
            entries.add(entry);
            entry = new Entry();
            transaction.commit();
        } catch (RuntimeException exception) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            throw exception;
        }
        return "redirect";
    }

    public String clearEntries() {
        try {
            transaction.begin();
            Query query = entityManager.createQuery("DELETE FROM Entry where sessionId = ?1");
            query.setParameter(1, sessionId);
            query.executeUpdate();
            entries.clear();
            transaction.commit();
        } catch (RuntimeException exception) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            throw exception;
        }
        return "redirect";
    }

    public Entry getEntry() {
        return entry;
    }

    public void setEntry(Entry entry) {
        this.entry = entry;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}
