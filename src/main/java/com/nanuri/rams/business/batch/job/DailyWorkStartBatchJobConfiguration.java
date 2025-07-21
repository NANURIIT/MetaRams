package com.nanuri.rams.business.batch.job;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JdbcCursorItemReader;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.database.builder.JdbcCursorItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import com.nanuri.rams.business.batch.job.entity.WorkVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 일일업무개시배치
 * 
 * @author bsh
 *
 */
@Slf4j
@RequiredArgsConstructor
@Configuration
public class DailyWorkStartBatchJobConfiguration {

	public static final String JOB_NAME = "DAILY_WORK_START_BATCH"; // ScheduleTask.java에서 호출된 JOB NAME
	public static final String BEAN_PREFIX = JOB_NAME + "_";

	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final DataSource dataSource; // DataSource DI

	private static final int chunkSize = 100;

	// Bean 시작
	@Bean(JOB_NAME)
	public Job job() {
		log.info("DAILY_WORK_START_BATCH START");
		return jobBuilderFactory.get(JOB_NAME)
				.start(step())
				// .next(step()) //example step
				.build();
	}

	// 실행 순서 정의
	@Bean(BEAN_PREFIX + "step")
	@JobScope
	public Step step() {
		log.info("STEP START");
		return stepBuilderFactory.get(BEAN_PREFIX + "step")
				.<WorkVo, WorkVo>chunk(chunkSize)
				.reader(reader())
				.writer(writer())
				.build();
	}

	/**
	 * 배치 대상 정보 조회
	 * @throws Exception 
	 */
	@Bean(BEAN_PREFIX + "reader")
	@StepScope
	public JdbcCursorItemReader<WorkVo> reader() {
		
		log.info("READER START");
        return new JdbcCursorItemReaderBuilder<WorkVo>()
                .fetchSize(chunkSize) 
                .dataSource(dataSource)
                .rowMapper(new BeanPropertyRowMapper<>(WorkVo.class))
                .sql("SELECT TO_CHAR(SYSDATE, 'YYYYMMDD') AS STDR_DT "
                		+ "FROM DUAL")
                .name("jdbcCursorItemReader")
                .build();
	}

	@Bean(BEAN_PREFIX + "writer")
	@StepScope
	public ItemWriter<WorkVo> writer() { // compositeItem -> 여러개 writer 할때 필요.
		return new JdbcBatchItemWriterBuilder<WorkVo>()
				.dataSource(dataSource)
				.sql("MERGE INTO IBIMS998B "
						+ "USING DUAL "
						+ "   ON (STDR_DT = :stdrDt)"
						+ " WHEN MATCHED THEN"
						+ "      UPDATE SET"
						+ "             JOB_OPNG_DTIME = SYSDATE,"
						+ "             OPNG_STFNO     = 'BATCH',"
						+ "             OPNG_ORGNO     = 'BATCH',"
						+ "             HDWR_OPNG_YN   = 'N'"
						+ " WHEN NOT MATCHED THEN"
						+ "      INSERT ("
						+ "             STDR_DT,"
						+ "             JOB_OPNG_DTIME,"
						+ "             JOB_CLSG_DTIME,"
						+ "             CLSG_DVSN_CD,"
						+ "             OPNG_STFNO,"
						+ "             OPNG_ORGNO,"
						+ "             HDWR_OPNG_YN,"
						+ "             CLSG_STFNO,"
						+ "             CLSG_ORGNO,"
						+ "             HDWR_CLSG_YN,"
						+ "             HND_DETL_DTM,"
						+ "             HND_EMPNO,"
						+ "             HND_TMNL_NO,"
						+ "             HND_TR_ID,"
						+ "             GUID"
						+ "             )"
						+ "      VALUES ("
						+ "             :stdrDt,"
						+ "             SYSDATE,"
						+ "             NULL,"
						+ "             NULL,"
						+ "             'BATCH',"
						+ "             'BATCH',"
						+ "             'N',"
						+ "             NULL,"
						+ "             NULL,"
						+ "             NULL,"
						+ "             SYSDATE,"
						+ "             'BATCH',"
						+ "             'BATCH',"
						+ "             'BATCH',"
						+ "             'BATCH'"
						+ "             )")
				.beanMapped()
				.build();
	}
    
}