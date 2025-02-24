package com.nanuri.rams.business.batch;

import java.lang.reflect.Method;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CallBatchMethod {

    @Autowired
    private ApplicationContext context;

    /**
     * 동적으로 메소드 호출
     * @param jobId 배치잡아이디
     * @param jobInstance 현재 작동시킬 Job정보
     */
    public String callMethod ( String jobId, IBIMS997BDTO jobInstance ) {

        try {
            
            String path = "tb" + jobId.substring(2, 6);
            String className = jobId.substring(0, 6) + "APIController";
    
            Object instance = context.getBean(Class.forName("com.nanuri.rams.business.assessment.tb90." + path + "." + className));

            Method method = instance.getClass().getDeclaredMethod("insert", IBIMS997BDTO.class);

            Object result = method.invoke(instance, jobInstance);

            // 성공시 Complete
            return (String) result;
        }
        
        catch (Exception e) {
            log.error("##########콜메소드 에러########## {}", e.getMessage(), e);
            return "5";
        }
        
    }
}
