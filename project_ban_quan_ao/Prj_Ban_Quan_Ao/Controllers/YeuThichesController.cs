using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prj_Ban_Quan_Ao.Models;

namespace Prj_Ban_Quan_Ao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YeuThichesController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public YeuThichesController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/YeuThiches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<YeuThich>>> GetYeuThiches()
        {
            return await _context.YeuThiches.ToListAsync();
        }

        // GET: api/YeuThiches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<YeuThich>> GetYeuThich(Guid id)
        {
            var yeuThich = await _context.YeuThiches.FindAsync(id);

            if (yeuThich == null)
            {
                return NotFound();
            }

            return yeuThich;
        }

        // PUT: api/YeuThiches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutYeuThich(Guid id, YeuThich yeuThich)
        {
            if (id != yeuThich.Id)
            {
                return BadRequest();
            }

            _context.Entry(yeuThich).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!YeuThichExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/YeuThiches
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<YeuThich>> PostYeuThich(YeuThich yeuThich)
        {
            _context.YeuThiches.Add(yeuThich);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetYeuThich", new { id = yeuThich.Id }, yeuThich);
        }

        // DELETE: api/YeuThiches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteYeuThich(Guid id)
        {
            var yeuThich = await _context.YeuThiches.FindAsync(id);
            if (yeuThich == null)
            {
                return NotFound();
            }

            _context.YeuThiches.Remove(yeuThich);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("checkYeuThich/{sanPhamId}/{accountId}")]
        public IActionResult GetSanPhamMoiVe(Guid sanPhamId, Guid accountId)
        {
            var query = (from yt in _context.YeuThiches
                         where yt.SanPhamId == sanPhamId && yt.AccountId == accountId
                         select yt
                         );
            return Ok(query.Any());
        }


        [HttpGet("getallsanphamyeuthich/{accountId}")]
        public IActionResult GetAllSanPhamYeuThich(Guid accountId)
        {
            var query = (from yt in _context.YeuThiches
                         join sp in _context.SanPhams on yt.SanPhamId equals sp.Id
                         join lsp in _context.LoaiSanPhams on sp.LoaiSanPhamId equals lsp.Id
                         where yt.AccountId == accountId
                         orderby yt.NgayTao descending
                         select new
                         {
                             id = sp.Id,
                             ten = sp.Ten,
                             gia = sp.Gia,
                             giaSauGiam = sp.GiaSauGiam,
                             danhGia = sp.DanhGia,
                             duongDanAnh = sp.DuongDanAnh,
                             ngayTao = sp.NgayTao,
                             tenLoai = lsp.TenLoai,
                             kichCo = string.Join(",", _context.SanPhamKichCos
                              .Where(kc => kc.SanPhamId == sp.Id)
                              .Select(kc => kc.KichCo)),
                             mau =  _context.SanPhamKichCos
                                    .Where(kc => kc.SanPhamId == sp.Id)
                                    .Select(kc => kc.Mau).ToList(),
                         }
                         ).ToList();
            return Ok(query);
        }

        [HttpDelete("xoaSanPhamYeuThich/{sanPhamId}/{accountId}")]
        public async Task<IActionResult> XoaSanPhamYeuThich(Guid sanPhamId, Guid accountId)
        {
            var spyt = (from am in _context.YeuThiches
                                     where am.AccountId == accountId && am.SanPhamId == sanPhamId
                                     select am)
                                    .FirstOrDefault();
            if (spyt == null)
            {
                return NotFound();
            }
            _context.YeuThiches.Remove(spyt);
            await _context.SaveChangesAsync();
            return Ok(NoContent());
        }


        private bool YeuThichExists(Guid id)
        {
            return _context.YeuThiches.Any(e => e.Id == id);
        }
    }
}
