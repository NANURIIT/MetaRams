package com.nanuri.rams.business.assessment.tb06.tb06013;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS115BDTO;
import com.nanuri.rams.business.common.dto.IBIMS212BDTO;
import com.nanuri.rams.business.common.dto.IBIMS213BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS211BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS212BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS213BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS214BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS215BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS216BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS217BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS218BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS219BMapper;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB06013PVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.StringUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB06013ServiceImpl implements TB06013Service {

	private final IBIMS211BMapper ibims211bMapper;
	private final IBIMS212BMapper ibims212bMapper;
	private final IBIMS213BMapper ibims213bMapper;
	private final IBIMS214BMapper ibims214bMapper;
	private final IBIMS215BMapper ibims215bMapper;
	private final IBIMS216BMapper ibims216bMapper;
	private final IBIMS217BMapper ibims217bMapper;
	private final IBIMS218BMapper ibims218bMapper;
	private final IBIMS219BMapper ibims219bMapper;
	
	private final AuthenticationFacade facade;

	@Override
	@Transactional
	public String registMtrt(TB06013PVO searchParam) {
		String mrtgMngmNo = "";
		if (StringUtil.isAllWhitespace(searchParam.getMrtgMngmNo())) {
			mrtgMngmNo = ibims211bMapper.makeMrtgMngmNo(searchParam);
			searchParam.setMrtgMngmNo(ibims211bMapper.makeMrtgMngmNo(searchParam));
		}

		int result = 0;
		String mrtgStupKndCd = searchParam.getMrtgStupKndCd();
		searchParam.setHndEmpno(facade.getDetails().getEno());
		if (!StringUtil.isAllWhitespace(mrtgStupKndCd)) {
			
			result = ibims211bMapper.insertIBIMS211B(searchParam);
			if (result > 0) {
				switch (mrtgStupKndCd) {
				case "2":
						result = ibims214bMapper.insertIBIMS214B(searchParam);
					break;
				case "3":
						result = ibims215bMapper.insertIBIMS215B(searchParam);
					break;
				case "5":
						result = ibims217bMapper.insertIBIMS217B(searchParam);
					break;
				case "8":
						result = ibims218bMapper.insertIBIMS218B(searchParam);
					break;
				case "9":
						result = ibims219bMapper.insertIBIMS219B(searchParam);
					break;
				case "10":
						result = ibims216bMapper.insertIBIMS216B(searchParam);
					break;
				default:
					break;
				}
			}
		}
			try {
				List<IBIMS213BDTO> prfdRankList = new ArrayList<IBIMS213BDTO>();
				IBIMS213BDTO prfdRankDto = new IBIMS213BDTO(); 
			
				// 담보번호
				for(int i = 0 ; i < searchParam.getPrfdRankList().size() ; i++) {
					prfdRankDto.setMrtgMngmNo(searchParam.getMrtgMngmNo());
					prfdRankDto.setStdrSn(searchParam.getPrfdRankList().get(i).getStdrSn());	// 기준일련번호
					prfdRankDto.setPrfdRankKndCd(searchParam.getPrfdRankList().get(i).getPrfdRankKndCd());	// 우선순위종류코드
					prfdRankDto.setPrfdRankBcncNm(searchParam.getPrfdRankList().get(i).getPrfdRankBcncNm()); // 우선순위거래처명
					prfdRankDto.setPrfdRank(searchParam.getPrfdRankList().get(i).getPrfdRank()); // 우선순위
					prfdRankDto.setPrfdRankCrryCd(searchParam.getPrfdRankList().get(i).getPrfdRankCrryCd()); // 우선순위통화코드
					prfdRankDto.setPrfdRankAmt(searchParam.getPrfdRankList().get(i).getPrfdRankAmt()); // 우선순위금액
					prfdRankDto.setKrwTrslPrfdRankAmt(searchParam.getPrfdRankList().get(i).getKrwTrslPrfdRankAmt()); // 원화환산우선금액
					prfdRankDto.setHndEmpno(facade.getDetails().getEno());
					prfdRankList.add(prfdRankDto);
				} 
				
				//추가(by hyTest)
				//선순위정보 있을경우에만
				if(prfdRankList.size()>0) {
					ibims213bMapper.delete213B(prfdRankDto);
					ibims213bMapper.insertIBIMS213B(prfdRankList);
				}	
			} catch (Exception e) {
				log.debug("IBIMS213B regist error!!!", e.getMessage());
			}
			

		return mrtgMngmNo;
	}

	@Override
	@Transactional
	public int modifyMtrt(TB06013PVO searchParam) {

		int result = 0;
		String mrtgStupKndCd = searchParam.getMrtgStupKndCd();
		searchParam.setHndEmpno(facade.getDetails().getEno());

		if (!StringUtil.isAllWhitespace(mrtgStupKndCd) && !StringUtil.isAllWhitespace(searchParam.getMrtgMngmNo())) {
			
			result = ibims211bMapper.updateIBIMS211B(searchParam);

			if (result > 0) {
				switch (mrtgStupKndCd) {
				case "2":
					ibims214bMapper.deleteIBIMS214B(searchParam);
					result = ibims214bMapper.insertIBIMS214B(searchParam);
					break;
				case "3":
					ibims215bMapper.deleteIBIMS215B(searchParam);
					result = ibims215bMapper.insertIBIMS215B(searchParam);
					break;
				case "5":
					ibims217bMapper.deleteIBIMS217B(searchParam);
					result = ibims217bMapper.insertIBIMS217B(searchParam);
					break;
				case "8":
					ibims218bMapper.deleteIBIMS218B(searchParam);
					result = ibims218bMapper.insertIBIMS218B(searchParam);
					break;
				case "9":
					ibims219bMapper.deleteIBIMS219B(searchParam);
					result = ibims219bMapper.insertIBIMS219B(searchParam);
					break;
				case "10":
					ibims216bMapper.deleteIBIMS216B(searchParam);
					result = ibims216bMapper.insertIBIMS216B(searchParam);
					break;
				default:
					break;
				}
			}
		}
		try {
			List<IBIMS213BDTO> prfdRankList = new ArrayList<IBIMS213BDTO>();
			IBIMS213BDTO prfdRankDto = new IBIMS213BDTO(); 
			// 담보번호
			prfdRankDto.setMrtgMngmNo(searchParam.getMrtgMngmNo());
			for(int i = 0 ; i < searchParam.getPrfdRankList().size() ; i++) {
				prfdRankDto = new IBIMS213BDTO();
				prfdRankDto.setMrtgMngmNo(searchParam.getMrtgMngmNo());
				prfdRankDto.setStdrSn(searchParam.getPrfdRankList().get(i).getStdrSn());	// 기준일련번호
				prfdRankDto.setPrfdRankKndCd(searchParam.getPrfdRankList().get(i).getPrfdRankKndCd());	// 우선순위종류코드
				prfdRankDto.setPrfdRankBcncNm(searchParam.getPrfdRankList().get(i).getPrfdRankBcncNm()); // 우선순위거래처명
				prfdRankDto.setPrfdRank(searchParam.getPrfdRankList().get(i).getPrfdRank()); // 우선순위
				prfdRankDto.setPrfdRankCrryCd(searchParam.getPrfdRankList().get(i).getPrfdRankCrryCd()); // 우선순위통화코드
				prfdRankDto.setPrfdRankAmt(searchParam.getPrfdRankList().get(i).getPrfdRankAmt()); // 우선순위금액
				prfdRankDto.setKrwTrslPrfdRankAmt(searchParam.getPrfdRankList().get(i).getKrwTrslPrfdRankAmt()); // 원화환산우선금액
				prfdRankDto.setHndEmpno(facade.getDetails().getEno());
				prfdRankList.add(prfdRankDto);
			}
			//추가(by hyTest)
			//선순위정보 있을경우에만
			if(prfdRankList.size()>0) {
				ibims213bMapper.delete213B(prfdRankDto);
				ibims213bMapper.insertIBIMS213B(prfdRankList);
			}	
		} catch (Exception e) {
			log.debug("IBIMS213B modify error!!!", e.getMessage());
		}
		return result;
	}

	@Override
	public int removeMtrt(TB06013PVO searchParam) {
		searchParam.setDelYn("Y");
		searchParam.setHndEmpno(facade.getDetails().getEno());
		return ibims211bMapper.updateIBIMS211B(searchParam);
	}

	@Override
	public int connectMrtgInfo(TB06013PVO searchParam) {
		
		IBIMS212BDTO temp = ibims212bMapper.selectIBIMS212B(searchParam);
		
		searchParam.setHndEmpno(facade.getDetails().getEno());
		
		if(temp == null) {
			return ibims212bMapper.insertIBIMS212B(searchParam); 
		}else {
			return ibims212bMapper.updateIBIMS212B(searchParam);
		}
	}


	@Override
	public int disConnectMrtgInfo(TB06013PVO searchParam) {
		
		return ibims212bMapper.deleteIBIMS212B(searchParam);
		
	}

	
	// 선순위정보 가져오기
	@Override
	public List<IBIMS213BDTO> prfdRankInfo(IBIMS213BDTO dtoParam) { return ibims213bMapper.prfdRankInfo(dtoParam); }
	
}
