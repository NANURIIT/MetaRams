package com.nanuri.rams.tb.tb04;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb04.tb04040.TB04040ServiceImpl;
import com.nanuri.rams.business.common.vo.IBIMS224BVO;

@SpringBootTest
public class TB04040STest {

    @Autowired
    private TB04040ServiceImpl tb04040ServiceImpl;

    /**
     * LOI/LOC 발급내역 조회 테스트1
     */
    @Test
    void getLoiIssDtlsTest1 () {

        IBIMS224BVO param = new IBIMS224BVO();

        /* 파라미터 세팅 */
        // param.setDealNo();
        // param.setDealNm();
        // param.setDprtCd();
        // param.setIssLtrDcd();
        /* 파라미터 세팅 */

        tb04040ServiceImpl.getLoiIssDtls(param);

    }

    
}
