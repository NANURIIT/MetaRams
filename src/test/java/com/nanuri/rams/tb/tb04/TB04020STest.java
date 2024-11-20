package com.nanuri.rams.tb.tb04;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb04.tb04020.TB04020ServiceImpl;
import com.nanuri.rams.business.common.vo.TB04020SVO;

@SpringBootTest
public class TB04020STest {

    @Autowired
    private TB04020ServiceImpl tb04020ServiceImpl;

    /**
     * 심사안건조회 테스트 1
     */
    @Test
    void checkDealSearchTest1 () {

        TB04020SVO param = new TB04020SVO();

        /* 파라미터 세팅 */
        // ㅇㅇㅋ
        /* 파라미터 세팅 */

        tb04020ServiceImpl.checkDealSearch(param);

    }
    
}
