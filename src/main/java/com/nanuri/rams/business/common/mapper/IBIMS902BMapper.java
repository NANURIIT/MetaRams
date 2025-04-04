package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS902BDTO;
import com.nanuri.rams.business.common.vo.IBIMS900BVO;
import com.nanuri.rams.business.common.vo.IBIMS902BVO;

@Mapper
public interface IBIMS902BMapper {

	/**
	 * SPC별 거래내역 조회
	 * 
	 * @param IBIMS902BVO
	 * @return List<IBIMS902BVO>
	 */
    public List<IBIMS902BVO> selectTB07230S(IBIMS902BVO param);

    /**
     * 딜잔액계산된 리스트
     * @param param 자금집행일련번호
     * @return
     */
    public List<IBIMS902BDTO> calcBlceList (String param);

    /**
     * 딜잔액 업데이트
     * @param param
     * @return
     */
    public int updateRndrBlce (IBIMS902BDTO param);

    /**
     * 화면에서 삭제된 입출금내역조회
     */
    public List<IBIMS902BDTO> deletedRndrList (List<IBIMS902BDTO> param);

    /**
     * 입출금요청내역삭제
     */
    public int deleteRndr (IBIMS902BDTO param);
    
    public int deleteRndrList (IBIMS902BDTO param);
    
    /**
	 * SPC별 거래내역 저장 - 거래내역수정
	 */
    public int updateTransaction(IBIMS902BDTO param);
    
    /**
	 * SPC별 거래내역 저장 - 잔액재계산(정렬순서sort기준)
	 */
    public int saveRecalculateBalance(IBIMS902BDTO param);

    /**
     * TB07200S - 입출금요청내역 저장
     */
    public int rndrRqstSave(IBIMS902BDTO param);

    /**
     * TB07200S - 입출금요청내역 수정
     */
    public int rndrRqstUpdate(IBIMS902BDTO param);

    /**
     * TB07200S - 입금요청내역 조회
     */
    public List<IBIMS902BDTO> getDpstRqstList(IBIMS900BVO param);

    /**
     * TB07200S - 출금요청내역 조회
     */
    public List<IBIMS902BDTO> getWthdrwlRqstList(IBIMS900BVO param);

}