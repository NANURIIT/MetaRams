package com.nanuri.rams.business.assessment.tb07.tb07020;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.dto.IBIMS402HDTO;
import com.nanuri.rams.business.common.dto.IBIMS405BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.IBIMS405BVO;
import com.nanuri.rams.business.common.vo.IBIMS402HVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.TB07010SVO;

import org.apache.poi.hpsf.Decimal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TB07020Service {

	public List<IBIMS405BVO> getBuyList(IBIMS405BDTO paramData);

	public int saveBuyInfo(IBIMS405BDTO paramData);

	public int cancelBuyInfo(IBIMS405BDTO paramData);

	public int getTrSn(IBIMS405BDTO paramData);

	public int saveDlTrList(IBIMS410BDTO paramData);

	public int updateDlTrList(IBIMS410BDTO paramData);

	public int cancelDlTrList(IBIMS410BDTO paramData);

	public String chkExcInfo(String paramData);

	public int saveExcInfo(IBIMS402BDTO paramData);

	public int uptExcInfoTr(IBIMS402BDTO paramData);

	public int saveExcInfoNoKey(IBIMS402BDTO paramData);

	public int insertIBIMS402HTr(IBIMS402BDTO paramData);

	public String getEprzCrdlCtrcAmt(String paramData);

}
