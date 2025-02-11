package com.nanuri.rams.business.batch;

import javax.sql.DataSource;

import org.springframework.batch.core.configuration.annotation.DefaultBatchConfigurer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.repository.support.JobRepositoryFactoryBean;
import org.springframework.batch.support.DatabaseType;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomBatchConfigurer extends DefaultBatchConfigurer {
	private final DataSource dataSource;

	public CustomBatchConfigurer(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	protected JobRepository createJobRepository() throws Exception {
		JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
		factory.setDataSource(dataSource); // 데이터소스 설정
		factory.setDatabaseType(DatabaseType.ORACLE.name()); // Tibero를 Oracle로 인식
		factory.setTransactionManager(getTransactionManager());
		factory.afterPropertiesSet(); // 설정 적용
		return factory.getObject(); // JobRepository 반환
	}
}