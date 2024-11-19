package com.nanuri.rams.tb.tb03;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb03.tb03020.TB03020ServiceImpl;
import com.nanuri.rams.business.common.dto.IBIMS101BDTO;

@SpringBootTest
public class TB03020STest {
    
    @Autowired
    private TB03020ServiceImpl tb03020ServiceImpl;

    /**
     * 뭘하는지를 안적어놓으셨다
     */
    @Test
    void getBscDealDetailTest1 () {
        
        IBIMS101BDTO param = new IBIMS101BDTO();

        /* 파라미터 세팅 */
        param.setDealNo("AG120240729140120");
        param.setDealNm("부산항 진해신항 준설토투기장(3구역) 호안(1공구) 축조공사");
        /* 파라미터 세팅 */

        tb03020ServiceImpl.getBscDealDetail(param);

    }

}
