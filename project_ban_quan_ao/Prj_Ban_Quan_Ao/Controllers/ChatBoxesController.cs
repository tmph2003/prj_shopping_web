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
    public class ChatBoxesController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public ChatBoxesController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/ChatBoxes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChatBox>>> GetChatBoxes()
        {
            return await _context.ChatBoxes.ToListAsync();
        }

        // GET: api/ChatBoxes/5
        [HttpGet("{idAccount}")]
        public async Task<ActionResult<IEnumerable<ChatBox>>> GetChatBox(Guid idAccount)
        {
            var chatBox = await _context.ChatBoxes.Where(x => x.AccountId == idAccount).OrderBy(x => x.NgayTao).ToListAsync();

            if (chatBox == null)
            {
                return NotFound();
            }

            return chatBox;
        }

        // PUT: api/ChatBoxes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChatBox(Guid id, ChatBox chatBox)
        {
            if (id != chatBox.Id)
            {
                return BadRequest();
            }

            _context.Entry(chatBox).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChatBoxExists(id))
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

        // POST: api/ChatBoxes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ChatBox>> PostChatBox(ChatBox chatBox)
        {
            _context.ChatBoxes.Add(chatBox);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/ChatBoxes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChatBox(Guid id)
        {
            var chatBox = await _context.ChatBoxes.FindAsync(id);
            if (chatBox == null)
            {
                return NotFound();
            }

            _context.ChatBoxes.Remove(chatBox);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChatBoxExists(Guid id)
        {
            return _context.ChatBoxes.Any(e => e.Id == id);
        }
    }
}
