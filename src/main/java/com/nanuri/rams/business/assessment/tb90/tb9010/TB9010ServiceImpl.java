package com.nanuri.rams.business.assessment.tb90.tb9010;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS810BDTO;
import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS811BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.business.common.vo.IBIMS810BVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.com.calculation.Calculation;
import com.nanuri.rams.com.dto.CalculationDTO;
import com.nanuri.rams.com.dto.CalculationResultDTO;
import com.nanuri.rams.com.dto.CalculationSumDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB9010ServiceImpl implements TB9010Service {

    @Autowired
    private Calculation calculation;

    @Autowired
    private final IBIMS811BMapper ibims811bMapper;
    private final IBIMS997BMapper ibims997bMapper;
    private final IBIMS402BMapper ibims402bMapper;

    @Autowired
	private AuthenticationFacade facade;

    @Override
    public int insert(IBIMS997BDTO param) {

        int result = 0;

        IBIMS997BDTO data = ibims997bMapper.daemonCheckData("TB9010B");

        if(data == null){
            return result;
        }

        data.setJobStatus("1");
        ibims997bMapper.updateIBIMS997B(data);
        
        int confirmJobCount = data.getConfirmJobCount(); 
        if(confirmJobCount >= 1){
            result = 0;
            return result;
        }

        IBIMS810BDTO ibims810bdto = new IBIMS810BDTO();

        ibims810bdto.setStdrDt(data.getCurDate());

        // 810테이블에 입력값 셀렉트
        List<IBIMS810BDTO> select = ibims811bMapper.selectIBIMS811B(ibims810bdto);
        // log.debug("SelectDataCheck:::{}", select);


        // 이자 계산 시물레이션
        // 태안씨가 만든 이자계산시뮬레이션 돌려야함
        CalculationDTO calcDto = new CalculationDTO();
        CalculationSumDTO calcSumDto = new CalculationSumDTO();
        for (int i = 0; i < select.size(); i++) {
            TB06015SVO inSvo = new TB06015SVO();

            String prdtCd = select.get(i).getPrdtCd();
            long excSn = select.get(i).getExcSn();
            String stdrDt = data.getCurDate();

            inSvo.setPrdtCd(prdtCd);
            inSvo.setExcSn(excSn);
            inSvo.setStdrDt(stdrDt);

            log.debug("<<<<<<<<parameterCheck>>>>>>>>");
            log.debug("inSvo.setPrdtCd: "+prdtCd);
            log.debug("inSvo.setExcSn: "+excSn);
            log.debug("inSvo.setStdrDt: "+stdrDt);
            List<CalculationResultDTO> outCalc = new ArrayList<>();
            outCalc = calculation.setIntrCalcSimulation(inSvo);
            log.debug("\n outCalc ::: [{}]", outCalc);
            TB06015SVO getDtlInf = ibims402bMapper.getDetailInfo(inSvo);
            String intrSnnoPrcsDcd = getDtlInf.getIntrSnnoPrcsDcd();
            log.debug("\n getDtlInf ::: [{}]", getDtlInf);
            log.debug("\n getDtlInf.getIntrSnnoPrcsDcd() ::: [{}]", getDtlInf.getIntrSnnoPrcsDcd());
            calcDto.setIntrSnnoPrcsDcd(intrSnnoPrcsDcd);

            calcSumDto = calculation.totalCalculation(calcDto, outCalc);

            log.debug("TotalIntr: "+ calcSumDto.getTotalIntr());                    
            log.debug("totalIntrOvduIntr: "+ calcSumDto.getTotalIntrOvduIntr());    

            select.get(i).setNrmlIntr(calcSumDto.getTotalIntr());                           //정상이자합계
            select.get(i).setIntrAmtOvduIntr(calcSumDto.getTotalIntrOvduIntr());            //이자연체이자 합계
        } // end of for

        IBIMS810BVO ibims810bvo = new IBIMS810BVO();

        ibims810bvo.setIbims810bdtoList(select);

        // 삭제
        int delete = ibims811bMapper.deleteIBIMS811B(data.getCurDate());

        // // 입력
        int insert = ibims811bMapper.insertIBIMS811B(ibims810bvo);

        //  체크
        if(delete >= 0 && insert >= 0 ){
            data.setJobStatus("2"); // complete
        }else {
            data.setJobStatus("3"); // error
        }
        ibims997bMapper.subPreJobCount(data);
        //  배치업데이트
        result = ibims997bMapper.batchUpdate(data);

        return result;
    };

}