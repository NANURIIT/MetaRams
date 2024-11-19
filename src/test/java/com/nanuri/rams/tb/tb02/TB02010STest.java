package com.nanuri.rams.tb.tb02;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb02.tb02010.TB02010ServiceImpl;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;

@SpringBootTest
public class TB02010STest {
    
    @Autowired
    private TB02010ServiceImpl tb02010ServiceImpl;

    /**
     * 사용자 정보 가져오는듯.. 안적어놓으셨다
     */
    @Test
    void getSummaryInfoTest1 () {

        IBIMS100BVO param = new IBIMS100BVO();

        /* 파라미터 세팅 */
        // param.selectVO.setEmpno("7711112");
        /* 파라미터 세팅 */

        tb02010ServiceImpl.getSummaryInfo(param);
    }

}
