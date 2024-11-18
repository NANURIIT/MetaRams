package com.nanuri.rams.com.intrCalculator;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.stereotype.Component;

import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS404BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS991BMapper;
import com.nanuri.rams.business.common.vo.IBIMS404BVO;
import com.nanuri.rams.business.common.vo.IBIMS991BVO;
import com.nanuri.rams.com.calculation.LoanData;
import com.nanuri.rams.com.dto.CalcDTO;
import com.nanuri.rams.com.dto.CalcRsltDTO;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Slf4j
@Component
public class IntrCalculator {

	private final IBIMS404BMapper ibims404BMapper;
	private final IBIMS991BMapper ibims991BMapper;
	private final IBIMS402BMapper ibims402BMapper;
	private final IBIMS403BMapper ibims403bMapper;

	

    /**
	 * 원금에 따른 이자 계산 (이자상환스케줄 없는 경우)
	 * @param inCalcDTO
	 * @param prnaCalcRstDTOList
	 * @return
	 */
    public List<CalcRsltDTO> intrCalc(CalcDTO inCalcDTO, List<CalcRsltDTO> prnaCalcRstDTOList){
        log.debug("############com.nanuri.rams.com.intrCalculator.intrCalc <= run############");

        List<CalcRsltDTO> rstlDtoList = new ArrayList<CalcRsltDTO>();

        List<LoanData> intrSchList = new ArrayList<LoanData>();
		List<LoanData> intrSchList2 = new ArrayList<LoanData>();

        if(!inCalcDTO.getDfrExpDt().isEmpty() || !"".equals(inCalcDTO.getDfrExpDt())) { 
			log.debug("거치만기일자 존재!!!");

			// intrSchList = calculation.dfrSchedule(inCalcDTO);
			// intrSchList2 = calculation.intrRdmpSchedule(inCalcDTO);
			
			// dfrSize = intrSchList.size();
			// intrSize = intrSchList2.size();
			// intrSchList.addAll(intrSchList2);


		} else {
			log.debug("거치만기일자 없음!!!");

			// intrSchList = calculation.intrRdmpSchedule(inCalcDTO);
			// intrSize = intrSchList.size();
		}
        

		return rstlDtoList;
    }
}
