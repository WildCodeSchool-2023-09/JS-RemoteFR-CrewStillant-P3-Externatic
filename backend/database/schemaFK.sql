-- Reference: candidate_degree (table: candidate_degree)
ALTER TABLE candidate_degree ADD CONSTRAINT candidate_degree FOREIGN KEY candidate_degree (candidate_id)
    REFERENCES candidate (id);

-- Reference: candidate_experience (table: experience)
ALTER TABLE experience ADD CONSTRAINT candidate_experience FOREIGN KEY candidate_experience (candidate_id)
    REFERENCES candidate (id);

-- Reference: candidate_user (table: candidate)
ALTER TABLE candidate ADD CONSTRAINT candidate_user FOREIGN KEY candidate_user (user_id)
    REFERENCES user (id);

-- Reference: company_sector (table: company)
ALTER TABLE company ADD CONSTRAINT company_sector FOREIGN KEY company_sector (company_sector_id)
    REFERENCES company_sector (id);

-- Reference: company_user (table: company)
ALTER TABLE company ADD CONSTRAINT company_user FOREIGN KEY company_user (user_id)
    REFERENCES user (id);

-- Reference: degree_candidate (table: candidate_degree)
ALTER TABLE candidate_degree ADD CONSTRAINT degree_candidate FOREIGN KEY degree_candidate (degree_id)
    REFERENCES degree (id);

-- Reference: job_activity (table: activity)
ALTER TABLE activity ADD CONSTRAINT job_activity FOREIGN KEY job_activity (job_id)
    REFERENCES job (id);

-- Reference: job_location (table: job)
ALTER TABLE job ADD CONSTRAINT job_location FOREIGN KEY job_location (location_id)
    REFERENCES location (id);

-- Reference: job_post_company (table: job)
ALTER TABLE job ADD CONSTRAINT job_post_company FOREIGN KEY job_post_company (company_id)
    REFERENCES company (id);

-- Reference: skill_candidate (table: skill)
ALTER TABLE skill ADD CONSTRAINT skill_candidate FOREIGN KEY skill_candidate (candidate_id)
    REFERENCES candidate (id);

-- Reference: skill_job (table: skill)
ALTER TABLE skill ADD CONSTRAINT skill_job FOREIGN KEY skill_job (job_id)
    REFERENCES job (id);

-- Reference: user_activity (table: activity)
ALTER TABLE activity ADD CONSTRAINT user_activity FOREIGN KEY user_activity (user_id)
    REFERENCES user (id);

-- Reference: user_type (table: user)
ALTER TABLE user ADD CONSTRAINT user_type FOREIGN KEY user_type (user_type_id)
    REFERENCES user_type (id);