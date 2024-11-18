package com.nanuri.rams.business.assessment.tb08.tb08060;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Comparator;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS820BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS820BMapper;
import com.nanuri.rams.business.common.vo.TB08060SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB08060ServiceImpl implements TB08060Service {

    private final IBIMS820BMapper ibims820bMapper;

    //월말결산 조회
    @Override
    public List<TB08060SVO> getSettlementList(TB08060SVO param){
        //log.debug("<<<<<<<<<<<parma check>>>>>>>>>>>");
        List<TB08060SVO> settlementList = new ArrayList<>();

        String eprzCrdlAcctCrtTpCd = param.getEprzCrdlAcctCrtTpCd();            //결산구분코드

        if(eprzCrdlAcctCrtTpCd.equals("2")){            //선수이자
            log.debug("선수이자 조회!!");
            settlementList = ibims820bMapper.getPrepaidIntrList(param);

        }else if(eprzCrdlAcctCrtTpCd.equals("3")){      //선수수료
            log.debug("선수수료 조회!!");
            settlementList = ibims820bMapper.getPrepaidFeeList(param);

            // for(int i = 0; i < settlementList.size(); i++){
            //     TB08060SVO settlementVO = settlementList.get(i);

            //     log.debug("settlementVO.getIntrClcDnum ::: " + settlementVO.getIntrClcDnum());

            // }

        }else if(eprzCrdlAcctCrtTpCd.equals("1")){      //미수이자
            log.debug("미수이자 조회!!");
            settlementList = ibims820bMapper.getAccruedIntrList(param);

        }else if(eprzCrdlAcctCrtTpCd.equals("4")){      //평가손상
            log.debug("평가손상 조회!!");
            settlementList = ibims820bMapper.getImprmtList(param);

        }

        //log.debug("\nsettlementList::: {}", settlementList);

        return settlementList;
    }

    //월말결산 업데이트
    @Override
    public int saveSettlement(List<IBIMS820BDTO> paramList){
        //log.debug("<<<<<<<<<<<saveSettlement parameter check>>>>>>>>>>>");
        //log.debug("\nparamList{}:::", paramList);

        //List<IBIMS820BDTO> updParamList = new ArrayList<>();

        // for(int i = 0; i < paramList.size(); i++){
        //     IBIMS820BDTO param = paramList.get(i);
        //     //IBIMS820BDTO updParam = new IBIMS820BDTO();

        //     log.debug("param.getThmmAcmlErnAmt ::: " + param.getThmmAcmlErnAmt());
        //     log.debug("param.getBfmmAcmlErnAmt ::: " + param.getBfmmAcmlErnAmt());
        //     log.debug("param.getStdrYm ::: " + param.getStdrYm());
        //     log.debug("param.getPrdtCd ::: " + param.getPrdtCd());
        //     log.debug("param.getRgstSn ::: " + param.getRgstSn());
        //     log.debug("param.getEprzCrdlStlaDcd ::: " + param.getEprzCrdlStlaDcd());
        // }

        int result = ibims820bMapper.updateSettlement(paramList);

        return result;
    }
    
}
