package com.nanuri.rams.tb.tb04;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb04.tb04010.TB04010ServiceImpl;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;

@SpringBootTest
public class TB04010STest {
    
    @Autowired
    private TB04010ServiceImpl tb04010ServiceImpl;

    /**
     * 딜 리스트 가져오기 테스트1
     */
    @Test
    void getDealListTest1() {

        IBIMS103BVO param = new IBIMS103BVO();

        /* 파라미터 세팅 */
        // ㅇㅇㅋ
        /* 파라미터 세팅 */

        tb04010ServiceImpl.getDealList(param);

    }

}
