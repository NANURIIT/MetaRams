package com.nanuri.rams.business.batch.job;

import javax.sql.DataSource;

import org.springframework.batch.core.configuration.annotation.DefaultBatchConfigurer;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.repository.support.JobRepositoryFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.PlatformTransactionManager;

@EnableBatchProcessing
public class TiberoBatchConfigurer extends DefaultBatchConfigurer {

	@Autowired
	private DataSource dataSource;
	@Autowired
	private PlatformTransactionManager transactionManager;

	public TiberoBatchConfigurer() {
		super();
	}

	public TiberoBatchConfigurer(DataSource dataSource) {
		super(dataSource);
	}

	@Override
	protected JobRepository createJobRepository() throws Exception {
		JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
		factory.setDataSource(dataSource);
		factory.setDatabaseType("ORACLE");
		factory.setTransactionManager(transactionManager);
		factory.afterPropertiesSet();
		return factory.getObject();
	}

	@Override
	public void setDataSource(DataSource dataSource) {
		// super.setDataSource(dataSource);
	}
}
