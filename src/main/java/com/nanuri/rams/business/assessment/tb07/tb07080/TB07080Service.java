package com.nanuri.rams.business.assessment.tb07.tb07080;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS404BVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;

@Service
public interface TB07080Service {

    public IBIMS402BVO selectOneIBIMS402B(IBIMS402BVO data);

    public List<IBIMS404BVO> getIntrRateInfos(TB06015SVO data);

	public List<String> getExcSnTB06015P(String prdtCd);

    public int uptExcInfo(IBIMS402BDTO data);

	public int insertListIBIMS404B(TB06015SVO paramData);

	public int updateListIBIMS404B(TB06015SVO paramData);

    public int deleteIBIMS404B(TB06015SVO paramData);
}
