package com.nanuri.rams.tb.tb04;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb04.tb04030.TB04030ServiceImpl;
import com.nanuri.rams.business.common.vo.TB04020SVO;

@SpringBootTest
public class TB04030STest {
    
    @Autowired
    private TB04030ServiceImpl tb04030ServiceImpl;

    /**
     * 접수관리 및 담당자 조회 테스트1
     */
    @Test
    void assignmentSearchTest1 () {

        TB04020SVO param = new TB04020SVO();

        /* 파라미터 세팅 */
        param.setRgstDtStart("20240101");
        param.setRgstDtEnd("20241231");
        // param.setbdcd();
        // param.setCrncyCd();
        // param.setDealNo();
        /* 파라미터 세팅 */

        tb04030ServiceImpl.assignmentSearch(param);

    }

}
