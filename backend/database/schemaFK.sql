-- foreign keys
-- Reference: company_sector 
ALTER TABLE company ADD CONSTRAINT company_sector_fk FOREIGN KEY (company_sector_id)
    REFERENCES company_sector (id);

-- Reference: candidate_degree 
ALTER TABLE candidate_degree ADD CONSTRAINT degree_candidate_fk FOREIGN KEY (degree_id)
    REFERENCES degree (id);

-- Reference: experience 
ALTER TABLE experience ADD CONSTRAINT candidate_experience_fk FOREIGN KEY (candidate_id)
    REFERENCES candidate (id);

-- Reference: job 
ALTER TABLE job ADD CONSTRAINT job_location_fk FOREIGN KEY (job_location_id)
    REFERENCES location (id);

-- Reference: job 
ALTER TABLE activity ADD CONSTRAINT user_job_fk FOREIGN KEY (user_account_id)
    REFERENCES user (id);

-- Reference: activity
ALTER TABLE activity ADD CONSTRAINT job_activity_fk FOREIGN KEY (job_post_id)
    REFERENCES job (id);

-- Reference: job_post_company 
ALTER TABLE job ADD CONSTRAINT job_company_fk FOREIGN KEY (company_id)
    REFERENCES company (id);

-- Reference: job_post_skill 
ALTER TABLE skill ADD CONSTRAINT job_skill_fk FOREIGN KEY (job_id)
    REFERENCES job (id);

-- Reference: candidate_degree 
ALTER TABLE candidate_degree ADD CONSTRAINT candidate_degree_fk FOREIGN KEY (candidate_id)
    REFERENCES candidate (id);

-- Reference: candidate 
ALTER TABLE candidate ADD CONSTRAINT user_candidate_fk FOREIGN KEY (user_account_id)
    REFERENCES user (id);

-- Reference: skill 
ALTER TABLE skill ADD CONSTRAINT candidate_skill_fk FOREIGN KEY (candidate_id)
    REFERENCES candidate (id);

-- Reference: user_type 
ALTER TABLE user ADD CONSTRAINT user_type_fk FOREIGN KEY (user_type_id)
    REFERENCES user_type (id);

-- End of file.
