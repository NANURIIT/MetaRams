package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS902BDTO;
import com.nanuri.rams.business.common.vo.IBIMS902BVO;

@Mapper
public interface IBIMS902BMapper {

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
     * 입출금요청내역삭제
     */
    public int deleteRndrList (IBIMS902BDTO param);

}