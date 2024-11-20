package com.nanuri.rams.tb.tb01;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb01010.TB01010ServiceImpl;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;


@SpringBootTest
public class TB01010STest {

    @Autowired
	private TB01010ServiceImpl tb01010ServiceImpl;

    /**
     * 안적어놓으셨다
     */
    @Test
    void selectCnfSttsTest1() {

        IBIMS103BVO param = new IBIMS103BVO();

        /* 파라미터 세팅 */
        param.setDealNo("AG120240729140120");
        // param.setMtrDcd();
        // param.setJdgmDcd();
        /* 파라미터 세팅 */

        tb01010ServiceImpl.selectCnfStts(param);

    }
    
}
